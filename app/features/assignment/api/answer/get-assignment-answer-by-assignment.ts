import { api } from "~/lib/api-client";
import type { AssignmentAnswer } from "~/types/api";

export const getAssignmentAnswerByAssignment = (assignment_id:string): Promise<{ data: AssignmentAnswer[] }> => {
  return api.get(`bootcamp/session_assignment_answer/assignment/${assignment_id}`);
};
