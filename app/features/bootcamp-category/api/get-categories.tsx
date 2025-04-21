import { api } from "~/lib/api-client";
import type { BootcampCategory } from "~/types/api";

export const getBootcampCategories = (): Promise<{
  data: BootcampCategory[];
}> => {
  return api.get("/bootcamp/category");
};
