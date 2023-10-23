import { recomendation_output_result } from "../../../logic/common/out_types/recomendation_output_result";
import { Scores } from "../../../logic/input/parse/file";
import { populateTableCorrelations } from "./table_correlations";

const table = document.getElementById("tableDataWithPredictions")!;
const txtOp = document.getElementById("txtOp") as HTMLParagraphElement;

export function buildTablePredictions(originalScores: Scores, out: recomendation_output_result) {
    document.body.classList.remove("align-items-center", "vh-100");
    document.body.classList.add("p-3");
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

                const predictionIndex = predictionCounter; // Save as constant to preserve between iterations
                a.addEventListener("click", evt => {
                    evt.preventDefault();
                    txtOp.innerText = out.elements_logs[predictionIndex].operation_logs;
                    populateTableCorrelations(out.elements_logs[predictionIndex].correlation.all_neighbours);
                    highlightNeighbors(out.elements_logs[predictionIndex].correlation.best_n_neighbours);
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
