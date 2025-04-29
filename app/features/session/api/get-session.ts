import { api } from "~/lib/api-client";
import type { Session } from "~/types/api";

export const getBootcampSession = (id:string): Promise<{ data: Session }> => {
  return api.get(`/bootcamp/session/${id}`);
};
