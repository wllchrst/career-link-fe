import { api } from "~/lib/api-client";
import type { AssignmentResult } from "~/types/api";

export const getAssignmentResultByAssignment = (assignment_id:string): Promise<{ data: AssignmentResult[] }> => {
  return api.get(`bootcamp/session_assignment_result_by_assignment_id/${assignment_id}`);
};
