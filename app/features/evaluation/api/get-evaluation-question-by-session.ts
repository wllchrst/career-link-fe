
import { api } from "~/lib/api-client";
import type { EvaluationQuestion } from "~/types/api";

export const getEvaluationQuestionBySession = (id:string): Promise<{ data: EvaluationQuestion[] }> => {
  return api.get(`bootcamp/session_evaluation_question/session/${id}`);
};
