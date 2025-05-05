import { api } from "~/lib/api-client";

export const deleteSessionTest = (id: string) => {
  return api.delete(`/bootcamp/session_test/${id}`);
};
