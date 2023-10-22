// This is the data that contains the output of de calculations.
export interface prediction_out {
  // Metric to use
  string_p: string;

  // Number of neighbours to compare to
  matrix_p: (number | undefined)[][];
}
