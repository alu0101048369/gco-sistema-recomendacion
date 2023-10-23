import { recomendation_output_result } from "../../../logic/common/out_types/recomendation_output_result";
import { Scores } from "../../../logic/input/parse/file";
import { buildTablePredictions } from "./table_predictions";

export function loadViewOutput(originalScores: Scores, out: recomendation_output_result) {
    document.body.classList.remove("align-items-center", "vh-100");
    document.body.classList.add("p-3");
    document.getElementsByTagName("main")[0].classList.remove("mw-500");

    buildTablePredictions(originalScores, out);
}
