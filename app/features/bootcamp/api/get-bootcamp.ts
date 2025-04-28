import { api } from "~/lib/api-client";
import type { Bootcamp } from "~/types/api";

export const getBootcamp = (id:string): Promise<{ data: Bootcamp }> => {
  return api.get(`/bootcamp/${id}`);
};
