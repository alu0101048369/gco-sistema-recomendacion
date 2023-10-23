import { recomendation_output_result } from "../../../logic/common/out_types/recomendation_output_result";
import { Scores } from "../../../logic/input/parse/file";

const table = document.getElementById("tableDataWithPredictions")!;
const txtOp = document.getElementById("txtOp") as HTMLParagraphElement;
const tableCorrelations = document.getElementById("tableCorrelations")!;

export function buildTable(originalScores: Scores, out: recomendation_output_result) {
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

                    tableCorrelations.innerHTML = "";
                    out.elements_logs[predictionIndex].correlation.all_neighbours.
                        sort((a, b) => a.index - b.index).
                        forEach(correl => {
                            const tr = document.createElement("tr");

                            const th = document.createElement("th");
                            th.innerText = String(correl.index+1);
                            tr.appendChild(th);
                            
                            const td = document.createElement("td");
                            td.innerText = String(correl.correlation);
                            tr.appendChild(td);

                            tableCorrelations.appendChild(tr);
                        });
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

function normalizeVal(val: number, max: number, min: number): number {
    return (val*(max-min))+min;
}
