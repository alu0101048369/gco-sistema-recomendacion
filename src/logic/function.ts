import { pearsonCorrelation } from "./metric/pearson";
import { cosineDistance } from "./metric/cosine_dist";
import { euclideanDistance } from "./metric/euclidean";
import { Parameters } from "./common/parameters";
import { prediction_out } from "./common/output_types";

/*
const M_test2 = [
  [1, 4, 3, 2, 3],
  [4, 1, 2, 3, 3],
  [3, 3, 4, 3, 5],
  [3, 3, 1, undefined, 5],
  [3, 5, 2, 1],
  [5, undefined, 4, 1, 4],
];*/

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
): number[] | undefined {
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

  return topNNeighbors.length > 0 ? topNNeighbors : undefined;
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
  targetColum: number,
  data: number[][],
  metric: string,
  type: string
): prediction_out {
  let nextData = data;
  let num = 0;
  let den = 0;
  let operation_log_num = "";
  let operation_log_den = "";

  // Iterate over the top N neighbors
  for (const neighborIndex of bestNeigh) {
    // Calculate the correlation between the current row and the neighbor
    const correlation = calculateCorrelation(
      nextData[targetRow],
      nextData[neighborIndex],
      metric
    );
    const u_v = nextData[neighborIndex][targetColum];

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
          }

          break;
        case "mean":
          num += correlation * (u_v - meanPuntuation(nextData[neighborIndex]));
          den += Math.abs(correlation);

          operation_log_num +=
            " " +
            correlation.toFixed(3) +
            " * (" +
            u_v.toFixed(3) +
            " - " +
            meanPuntuation(nextData[neighborIndex]).toFixed(3) +
            ") ";
          operation_log_den += " " + Math.abs(correlation).toFixed(3);
          if (neighborIndex !== bestNeigh[bestNeigh.length - 1]) {
            operation_log_den += " + ";
            operation_log_num += " + ";
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
      nextData[targetRow][targetColum] = num / (den || 1);

      break;
    case "mean":
      nextData[targetRow][targetColum] =
        meanPuntuation(data[targetRow]) + num / (den || 1);
      break;

    default:
      break;
  }

  const OutComposed: prediction_out = {
    string_p: operation_log_num + " / " + operation_log_den,
    matrix_p: nextData,
  };

  return OutComposed;
}

export function recomendation(params: Parameters) {
  // Create a copy of the input matrix
  let result = [...params.scores];
  const n = 2;

  // Iterate over each element in the matrix
  for (let i = 0; i < params.scores.length; i++) {
    for (let j = 0; j < params.scores[i].length; j++) {
      // Check if the element is undefined
      if (params.scores[i][j] === undefined) {
        // Find the top N neighbors for the current row and column
        const bestNeigh = findTopNNeighbors(params.scores, i, n, params.metric);

        if (bestNeigh !== undefined) {
          result = calculatePredictionGivenType(
            bestNeigh,
            i,
            j,
            params.scores as number[][],
            params.metric,
            params.prediction
          )?.matrix_p;
        }
      }
    }
  }

  return result;
}

const M_test = [
  [5.0, 3.0, 4.0, 4.0, undefined],
  [3.0, 1.0, 2.0, 3.0, 3.0],
  [4.0, 3.0, 4.0, 3.0, 5.0],
  [3.0, 3.0, 1.0, 5.0, 4.0],
  [1.0, 5.0, 5.0, 2.0, 1.0],
];

console.log(M_test);
