import { api } from "~/lib/api-client";

export const deleteQuestion = (questionId: string) => {
  return api.delete(`/bootcamp/session_test_question/${questionId}`);
};
