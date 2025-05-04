import { api } from "~/lib/api-client";
import type { Question } from "~/types/api";
import { getQuestionOptions } from "./get-question-option";

export const getSessionTestQuestions = async (id:string): Promise<{ data: Question[] }> => {
  const {data} = await api.get<Question[]>(`bootcamp/session_test_question_by_test_id/${id}`);

  await Promise.all(data.map(async (e, idx) => data[idx].options = (await getQuestionOptions(e.id)).data))
  return {data};
};
