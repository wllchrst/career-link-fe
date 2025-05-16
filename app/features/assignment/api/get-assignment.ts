import { api } from "~/lib/api-client";
import type { Assignment } from "~/types/api";

export const getAssignment = (id:string): Promise<{ data: Assignment }> => {
  return api.get(`bootcamp/session_assignment/session/${id}`);
};
