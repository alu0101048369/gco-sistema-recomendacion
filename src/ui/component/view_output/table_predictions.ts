import { recomendation_output_result } from "../../../logic/common/out_types/recomendation_output_result";
import { Scores } from "../../../logic/input/parse/file";
import { showDetails } from "./details";

const table = document.getElementById("tableDataWithPredictions")!;

export function buildTablePredictions(originalScores: Scores, out: recomendation_output_result) {
    (document.getElementById("tableDataHeader") as HTMLTableCellElement).colSpan = originalScores.normValues[0].length;
    let predictionCounter = 0;

    originalScores.normValues.forEach((row, nrow) => {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.innerText = String(nrow+1);
        tr.appendChild(th);

        row.forEach((col, ncol) => {
            const td = document.createElement("td");
            if (col === undefined) {
                col = normalizeVal(out.result_matrix[nrow][ncol] as number, originalScores.max, originalScores.min);

                const a = document.createElement("a");
                a.href = "#";
                a.innerText = String(col);

                const data = out.elements_logs[predictionCounter];
                a.addEventListener("click", evt => {
                    evt.preventDefault();
                    highlightNeighbors(data.correlation.best_n_neighbours);
                    showDetails(data);
                });

                predictionCounter++;
                td.appendChild(a);
            } else {
                col = normalizeVal(col, originalScores.max, originalScores.min);
                td.innerText = String(col);
            }
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
}

function highlightNeighbors(neighbors: number[]) {
    neighbors = neighbors.sort();
    let i = 0;
    Array.from(table.children).forEach((tr, row) => {
        let isBestNeighbor = false;
        if (row === neighbors[i]) {
            isBestNeighbor = true;
            i++;
        }
        
        Array.from(tr.children).forEach(td => {
            if (isBestNeighbor) {
                td.classList.add("bg-primary-subtle");
            } else {
                td.classList.remove("bg-primary-subtle");
            }
        });
    });
}

function normalizeVal(val: number, max: number, min: number): number {
    return (val*(max-min))+min;
}
