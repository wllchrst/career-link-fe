
import { api } from "~/lib/api-client";

export const deleteEvaluationQuestion = (id:string) => {
  return api.delete(`bootcamp/session_evaluation_question/${id}`);
};
