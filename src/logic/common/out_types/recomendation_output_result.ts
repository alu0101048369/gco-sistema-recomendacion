import { element_predicition_data } from "./element_predicition_data";

export interface recomendation_output_result {
  elements_logs: element_predicition_data[];
  result_matrix: (number | undefined)[][];
}
