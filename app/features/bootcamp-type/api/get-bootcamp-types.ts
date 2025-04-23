import { api } from "~/lib/api-client";
import type { BootcampType } from "~/types/api";

export const getBootcampTypes = (): Promise<{ data: BootcampType[] }> => {
  return api.get("/bootcamp/type");
};
