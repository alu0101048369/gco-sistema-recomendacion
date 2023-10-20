// This is the data the UI will provide the model.
export interface Parameters {
    // Metric to use
    metric: "pearson"|"cosine"|"euclidean",

    // Number of neighbours to compare to
    neighbours: number,
    
    // Type of prediction to do
    prediction: "simple"|"mean",
    
    // Scores given by the users. The first index will represent row, and the
    // second column. The values are normalized (adjusted to be between 0 and
    // 1). A not defined score will be `undefined`.
    scores: (number|undefined)[][],
}
