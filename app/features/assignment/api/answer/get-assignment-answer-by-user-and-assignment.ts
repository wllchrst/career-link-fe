import { api } from "~/lib/api-client";
import type { AssignmentAnswer } from "~/types/api";

export const getAssignmentAnswerByUserAndAssignment = (assignment_id:string, user_id:string): Promise<{ data: AssignmentAnswer }> => {
  return api.get(`bootcamp/session_assignment_answer/assignment/${assignment_id}/user/${user_id}`);
};
