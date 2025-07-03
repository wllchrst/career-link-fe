import { api } from "~/lib/api-client";

export const deleteAssignment = (id: string) => {
  return api.delete(`/bootcamp/session_assignment/${id}`);
};
