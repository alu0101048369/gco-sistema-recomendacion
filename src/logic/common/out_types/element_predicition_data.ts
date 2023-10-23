import { correlation_log } from "./correlation_log";

export interface element_predicition_data {
  // Correlation with all other nieghbours as well as n best neighbours
  correlation: correlation_log;
  // All operations done
  operation_logs: string;
}
