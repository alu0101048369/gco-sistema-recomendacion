import { element_predicition_data } from "../../../logic/common/out_types/element_predicition_data";
import { populateTableCorrelations } from "./table_correlations";

const sectionDetails = document.getElementById("sectionDetails")!;
const txtOp = document.getElementById("txtOp") as HTMLParagraphElement;
const txtTablePredictionsFoot = document.getElementById("txtTablePredictionsFoot")!;

export function showDetails(data: element_predicition_data) {
    sectionDetails.classList.remove("d-none");
    txtTablePredictionsFoot.innerText = "Las celdas en color azul corresponden a los vecinos seleccionados";
    
    txtOp.innerText = data.operation_logs;
    populateTableCorrelations(data.correlation.all_neighbours);
}
