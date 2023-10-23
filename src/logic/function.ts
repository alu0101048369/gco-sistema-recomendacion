import { pearsonCorrelation } from "./metric/pearson";
import { cosineDistance } from "./metric/cosine_dist";
import { euclideanDistance } from "./metric/euclidean";
import { Parameters } from "./common/parameters";
import { operation_log } from "./common/out_types/operation_log";
import { correlation_log } from "./common/out_types/correlation_log";
import { recomendation_output_result } from "./common/out_types/recomendation_output_result";
import { element_predicition_data } from "./common/out_types/element_predicition_data";

function calculateCorrelation(
  x: (number | undefined)[],
  y: (number | undefined)[],
  metric: string
): number | undefined {
  switch (metric.toLowerCase()) {
    case "pearson":
      return pearsonCorrelation(x, y);
    case "cosine":
      return cosineDistance(x, y);
    case "euclidean":
      return euclideanDistance(x, y);
    default:
      throw new Error(
        "Invalid correlation metric. Supported metrics: pearson, cosine, euclidean"
      );
  }
}

function findTopNNeighbors(
  matrix: (number | undefined)[][],
  targetRowIndex: number,
  n: number,
  metric: string
): correlation_log | undefined {
  const numRows = matrix.length;

  // Calculate the correlation coefficient between the target row and all other rows
  const correlations: { index: number; correlation: number }[] = [];

  // Iterate over all rows in the matrix
  for (let i = 0; i < numRows; i++) {
    // Exclude the target row itself
    if (i !== targetRowIndex) {
      // Calculate the Pearson correlation coefficient
      const correlation = calculateCorrelation(
        matrix[targetRowIndex],
        matrix[i],
        metric
      );

      // Store the correlation along with the row index
      if (correlation !== undefined) {
        correlations.push({ index: i, correlation });
      }
    }
  }

  // Sort the rows by correlation coefficient in descending order.
  correlations.sort((a, b) => b.correlation - a.correlation);

  // Select the first N rows (top neighbors)
  const topNNeighbors = correlations.slice(0, n).map((entry) => entry.index);
  if (topNNeighbors.length > 0) {
    const out_data_log: correlation_log = {
      all_neighbours: correlations,
      best_n_neighbours: topNNeighbors,
    };
    return out_data_log;
  }

  return undefined;
}

function meanPuntuation(row: (number | undefined)[]): number {
  // Filter out undefined values from the row
  const filteredRow = row.filter(
    (value) => typeof value === "number"
  ) as number[];

  // Calculate the mean of the filtered row
  const mean =
    filteredRow.reduce((sum, value) => sum + value, 0) / filteredRow.length;

  // Return 0 if mean is NaN (in case of an empty row)
  return isNaN(mean) ? 0 : mean;
}

function calculatePredictionGivenType(
  bestNeigh: number[],
  targetRow: number,
  targetCol: number,
  data: (number | undefined)[][],
  metric: string,
  type: string
): operation_log {
  let nextData = data.map((row) => row.map((val) => val));
  let num = 0;
  let den = 0;
  let operation_log_num = "( ";
  let operation_log_den = "( ";

  // Iterate over the top N neighbors
  for (const neighborIndex of bestNeigh) {
    // Calculate the correlation between the current row and the neighbor
    const correlation = calculateCorrelation(
      data[targetRow],
      data[neighborIndex],
      metric
    );
    const u_v = data[neighborIndex][targetCol];

    // Update the numerator and denominator for the prediction
    if (correlation !== undefined && u_v !== undefined) {
      switch (type) {
        case "simple":
          num += correlation * u_v;
          den += Math.abs(correlation);
          operation_log_num +=
            " " + correlation.toFixed(3) + " * " + u_v.toFixed(3);
          operation_log_den += " " + Math.abs(correlation).toFixed(3);
          if (neighborIndex !== bestNeigh[bestNeigh.length - 1]) {
            operation_log_den += " + ";
            operation_log_num += " + ";
          } else {
            operation_log_num += " )";
            operation_log_den += " )";
          }

          break;
        case "mean":
          num += correlation * (u_v - meanPuntuation(data[neighborIndex]));
          den += Math.abs(correlation);

          operation_log_num +=
            " " +
            correlation.toFixed(3) +
            " * (" +
            u_v.toFixed(3) +
            " - " +
            meanPuntuation(data[neighborIndex]).toFixed(3) +
            ") ";
          operation_log_den += " " + Math.abs(correlation).toFixed(3);
          if (neighborIndex !== bestNeigh[bestNeigh.length - 1]) {
            operation_log_den += " + ";
            operation_log_num += " + ";
          } else {
            operation_log_num += " )";
            operation_log_den += " )";
          }
          break;

        default:
          break;
      }
    }
  }
  // Calculate the predicted value and update the result matrix
  switch (type) {
    case "simple":
      nextData[targetRow][targetCol] = num / (den || 1);

      break;
    case "mean":
      operation_log_num =
        meanPuntuation(data[targetRow]).toFixed(3) + " + (" + operation_log_num;
      operation_log_den += " )";
      nextData[targetRow][targetCol] =
        meanPuntuation(data[targetRow]) + num / (den || 1);
      break;

    default:
      break;
  }

  const OutComposed: operation_log = {
    string_log:
      "Row: " +
      targetRow +
      " Col: " +
      targetCol +
      " Operation: " +
      operation_log_num +
      " / " +
      operation_log_den,
    matrix_p: nextData,
  };
  return OutComposed;
}

export function recomendation(params: Parameters) {
  // Create a copy of the input matrix
  let m_result = params.scores.map((row) => row.map((val) => val));
  let all_elements_logs: element_predicition_data[] = [];

  // Iterate over each element in the matrix
  for (let i = 0; i < m_result.length; i++) {
    for (let j = 0; j < m_result[i].length; j++) {
      // Check if the element is undefined
      if (m_result[i][j] === undefined) {
        // Find the top N neighbors for the current row and column
        const bestNeigh = findTopNNeighbors(
          params.scores,
          i,
          params.neighbours,
          params.metric
        );

        if (bestNeigh !== undefined) {
          const all_data = calculatePredictionGivenType(
            bestNeigh.best_n_neighbours,
            i,
            j,
            params.scores,
            params.metric,
            params.prediction
          );
          console.log(all_data?.matrix_p);
          const element_data: element_predicition_data = {
            correlation: bestNeigh,
            operation_logs: all_data.string_log,
          };
          all_elements_logs.push(element_data);
          m_result[i][j] = all_data?.matrix_p[i][j];
        }
      }
    }
  }
  const full_data: recomendation_output_result = {
    elements_logs: all_elements_logs,
    result_matrix: m_result,
  };
  return full_data;
}
