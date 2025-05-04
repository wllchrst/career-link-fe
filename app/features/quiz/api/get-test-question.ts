import { api } from "~/lib/api-client";
import type { Question } from "~/types/api";

export const getSessionTest = (id:string): Promise<{ data: Question[] }> => {
  return api.get(`bootcamp/session_test_by_session_id/${id}`);
};
