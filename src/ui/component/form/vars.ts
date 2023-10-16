let file = "";
let metric = "";
let neighbors = 0;
let prediction = "";

export function getFile(): string {
    return file;
}

export function getMetric(): string {
    return metric;
}

export function getNeighbors(): number {
    return neighbors;
}

export function getPrediction(): string {
    return prediction;
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
