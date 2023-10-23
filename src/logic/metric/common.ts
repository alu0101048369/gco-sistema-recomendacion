export function getElementsInCommon(x: (number|undefined)[], y: (number|undefined)[]): {filteredX: number[], filteredY: number[]} {
    const result = {
        filteredX: [] as number[],
        filteredY: [] as number[]
    }
    x.forEach((val, i) => {
        if (val !== undefined && y[i] !== undefined) {
            result.filteredX.push(val);
            result.filteredY.push(y[i] as number);
        }
    })
    return result;
}
