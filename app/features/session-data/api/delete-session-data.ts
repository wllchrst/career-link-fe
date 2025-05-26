import { api } from "~/lib/api-client";

export const deleteSessionData = (id: string) => {
  return api.delete(`bootcamp/session_data/${id}`);
};
