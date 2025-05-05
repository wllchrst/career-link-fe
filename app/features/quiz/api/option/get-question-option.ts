import { api } from "~/lib/api-client";
import type { Option } from "~/types/api";

export const getQuestionOptions = (id:string): Promise<{ data: Option[] }> => {
  return api.get(`bootcamp/question_option_by_question_id/${id}`);
};
