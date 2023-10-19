import { Parameters } from "./common/parameters";
import { pearsonCorrelation } from "./metric/pearson";
const M_test = [
  [5.0, 3.0, 4.0, 4.0, undefined],
  [3.0, 1.0, 2.0, 3.0, 3.0],
  [4.0, 3.0, 4.0, 3.0, 5.0],
  [3.0, 3.0, 1.0, 5.0, 4.0],
  [1.0, 5.0, 5.0, 2.0, 1.0],
];
const M_test2 = [
  [1, 4, 3, 2, 3],
  [4, 1, 2, 3, 3],
  [3, 3, 4, 3, 5],
  [3, 3, 1, undefined, 5],
  [3, 5, 2, 1],
  [5, undefined, 4, 1, 4],
];

function findTopNNeighbors(
  matrix: (number | undefined)[][],
  targetRowIndex: number,
  n: number
): number[] | undefined {
  const numRows = matrix.length;

  // Calculate the correlation coefficient between the target row and all other rows
  const correlations: { index: number; correlation: number }[] = [];

  // Iterate over all rows in the matrix
  for (let i = 0; i < numRows; i++) {
    // Exclude the target row itself
    if (i !== targetRowIndex) {
      // Calculate the Pearson correlation coefficient
      const correlation = pearsonCorrelation(matrix[targetRowIndex], matrix[i]);

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

function prediction(params: (number | undefined)[][]) {
  // Create a copy of the input matrix
  const result = [...params];
  const n = 2;

  // Iterate over each element in the matrix
  for (let i = 0; i < params.length; i++) {
    for (let j = 0; j < params[i].length; j++) {
      // Check if the element is undefined
      if (params[i][j] === undefined) {
        // Find the top N neighbors for the current row and column
        const bestNeigh = findTopNNeighbors(params, i, n);

        if (bestNeigh !== undefined) {
          let num = 0;
          let den = 0;

          // Iterate over the top N neighbors
          for (const neighborIndex of bestNeigh) {
            // Calculate the correlation between the current row and the neighbor
            const correlation = pearsonCorrelation(
              params[i],
              params[neighborIndex]
            );
            const u_v = params[neighborIndex][j];

            // Update the numerator and denominator for the prediction
            if (correlation !== undefined && u_v !== undefined) {
              num +=
                correlation * (u_v - meanPuntuation(params[neighborIndex]));
              den += Math.abs(correlation);
            }
          }

          // Calculate the predicted value and update the result matrix
          result[i][j] = meanPuntuation(params[i]) + num / (den || 1);
        }
      }
    }
  }

  return result;
}
console.log(prediction(M_test2));
