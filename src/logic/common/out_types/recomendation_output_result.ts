import { element_predicition_data } from "./element_predicition_data";
// Data containing all information needed
export interface recomendation_output_result {
  // Data of each element updated
  elements_logs: element_predicition_data[];
  // Matris of results
  result_matrix: (number | undefined)[][];
}
