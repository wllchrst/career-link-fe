import { api } from "~/lib/api-client";
import type { SessionTest } from "~/types/api";

export const getSessionTest = (id:string): Promise<{ data: SessionTest[] }> => {
  return api.get(`bootcamp/session_test_by_session_id/${id}`);
};
