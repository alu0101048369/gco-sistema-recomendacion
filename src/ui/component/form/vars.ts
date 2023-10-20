let callback = (_: FormVars) => {};
let file = "";
let metric = "";
let neighbors = 0;
let prediction = "";

export interface FormVars {
    file: string;
    metric: string;
    neighbors: number;
    prediction: string;
}

export function execCallback() {
    callback({ file, metric, neighbors, prediction });
}

export function setCallback(c: (vars: FormVars) => void) {
    callback = c;
}

export function setFile(f: string) {
    file = f;
}

export function setMetric(m: string) {
    metric = m;
}

export function setNeighbors(n: number) {
    neighbors = n;
}

export function setPrediction(p: string) {
    prediction = p;
}
