
import { api } from "~/lib/api-client";
import type { SessionData } from "~/types/api";

export const getSessionDataBySession = (id:string): Promise<{ data: SessionData[] }> => {
  return api.get(`bootcamp/session_data_by_session_id/${id}`);
};
