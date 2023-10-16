export interface Scores {
    normValues: (number|undefined)[][]
    max: number
    min: number
}

export function parseFile(s: string)  {
    const lines = s.replace(/\r/g, "").split("\n").filter(line => line.length !== 0);
    
    const min = parseScore(lines[0]);
    if (min === undefined) {
        throw new Error("invalid minimum score");
    }

    const max = parseScore(lines[1]);
    if (max === undefined) {
        throw new Error("invalid maximum score");
    }

    const scores = [] as (number|undefined)[][];
    let columns = -1;
    lines.slice(2).forEach(line => {
        const rowValues = line.split(/\s+/);
        if (columns < 0) {
            columns = rowValues.length;
        } else if (columns !== rowValues.length) {
            throw new Error("inconsistent number of columns");
        }
        scores.push(rowValues.map(str => {
            const score = parseScore(str);
            if (score !== undefined && (score < min || score > max)) {
                throw new Error(`value '${score}' is out of bounds (min: ${min}, max: ${max})`);
            }
            return score;
        }));
    });
    return { normValues: scores, max, min }
}

function parseScore(s: string): number|undefined {
    s = s.trim();
    if (s === "-") {
        return undefined;
    }

    const num = Number(s);
    if (isNaN(num) || !isFinite(num)) {
        throw new Error(`invalid number: ${s}`);
    }
    return num;
}
