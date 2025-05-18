import { api } from "~/lib/api-client";
import type { SessionTest } from "~/types/api";

export const getTest = (id:string): Promise<{ data: SessionTest }> => {
  return api.get(`bootcamp/session_test/${id}`);
};
