import { Parameters } from "./common/parameters";
import { pearsonCorrelation } from "./metric/pearson";
import { cosineDistance }from "./metric/cosine_dist";
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
  const correlations: { index: number; correlation?: number }[] = [];

  for (let i = 0; i < numRows; i++) {
    if (i !== targetRowIndex) {
      const correlation = pearsonCorrelation(matrix[targetRowIndex], matrix[i]);
      if (correlation !== undefined)
        correlations.push({ index: i, correlation });
    }
  }

  // Sort the rows by correlation coefficient in descending order.
  correlations.sort((a, b) => (b.correlation || 0) - (a.correlation || 0));

  // Select the first N rows (top neighbors)
  const topNNeighbors = correlations.slice(0, n).map((entry) => entry.index);

  return topNNeighbors.length > 0 ? topNNeighbors : undefined;
}
function meanPuntuation(row: (number | undefined)[]): number {
  const filteredRow: number[] = [];
  for (let i = 0; i < row.length; i++) {
    if (typeof row[i] === "number") {
      filteredRow.push(row[i] as number);
    }
  }
  const mean =
    filteredRow.reduce((sum, value) => sum + value, 0) / filteredRow.length;
  return mean;
}

function prediction(params: (number | undefined)[][]) {
  let result = params;
  let num = 0;
  let den = 0;
  const n = 2;
  for (let i = 0; i < params.length; i++) {
    for (let j = 0; j < params[i].length; j++) {
      if (params[i][j] === undefined) {
        const best_neigh = findTopNNeighbors(params, i, n);
        if (best_neigh !== undefined) {
          let num = 0;
          let den = 0;
          for (let z = 0; z < best_neigh.length; z++) {
            const correlation = pearsonCorrelation(
              params[i],
              params[best_neigh[z]]
            );
            const u_v = params[best_neigh[z]][j];

            if (correlation !== undefined && u_v !== undefined) {
              num =
                num +
                correlation * (u_v - meanPuntuation(params[best_neigh[z]]));
              den = den + Math.abs(correlation);
            }
          }

          result[i][j] = meanPuntuation(params[i]) + num / den;
        }
      }
    }
  }

  return result;
}

console.log(prediction(M_test2));
