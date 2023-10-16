let file = "";
let metric = "";

export function getFile(): string {
    return file;
}

export function getMetric(): string {
    return metric;
}

export function setFile(f: string) {
    file = f;
}

export function setMetric(m: string) {
    metric = m;
}
