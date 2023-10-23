import { correlation_log } from "./correlation_log";

export interface element_predicition_data {
  // Logs of all operations and target element
  correlation: correlation_log;
  operation_logs: string;
}
