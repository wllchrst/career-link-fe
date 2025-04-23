import { api } from "~/lib/api-client";
import type { Bootcamp } from "~/types/api";

export const getBootcamps = (): Promise<{ data: Bootcamp[] }> => {
  return api.get("/bootcamp");
};
