export function pearsonCorrelation(
  x: (number | undefined)[],
  y: (number | undefined)[]
): number | undefined {
  // Get elements in common

  const filteredX: number[] = [];
  const filteredY: number[] = [];

  for (let i = 0; i < x.length; i++) {
    if (typeof x[i] === "number" && typeof y[i] === "number") {
      filteredX.push(x[i] as number);
      filteredY.push(y[i] as number);
    }
  }

  const n = filteredX.length;

  // If there are no common elements, it returns undefined
  if (n === 0) {
    return undefined;
  }

  // Averages
  const XAverage = filteredX.reduce((a, b) => a + b) / n;
  const YAverage = filteredY.reduce((a, b) => a + b) / n;

  // Calculate Pearson correlation coefficient

  let numerator = 0;
  let FirstPartDenominator = 0;
  let SecondPartDenominator = 0;

  for (let i = 0; i < n; i++) {
    const xdiff = filteredX[i] - XAverage;
    const ydiff = filteredY[i] - YAverage;
    numerator = numerator + xdiff * ydiff;
    FirstPartDenominator = FirstPartDenominator + xdiff * xdiff;
    SecondPartDenominator = SecondPartDenominator + ydiff * ydiff;
  }

  // Check division by 0
  if (FirstPartDenominator === 0 || SecondPartDenominator === 0) {
    return undefined;
  }

  const result =
    numerator /
    (Math.sqrt(FirstPartDenominator) * Math.sqrt(SecondPartDenominator));

  return result;
}

// TEST

/*
const vectorX: (number | undefined)[] = [1, 2, 3, 4, undefined, 5];
const vectorY: (number | undefined)[] = [2, 3, undefined, 4, 5, 6];

const correlation = pearsonCorrelation(vectorX, vectorY);

if (correlation !== undefined) {
  console.log(`El coeficiente de correlación de Pearson es: ${correlation}`);
} else {
  console.log("No hay suficientes elementos para calcular la correlación.");
}

*/
