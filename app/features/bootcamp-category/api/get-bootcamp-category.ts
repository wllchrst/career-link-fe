import { api } from "~/lib/api-client";
import type { BootcampCategory } from "~/types/api";

export const getBootcampCategory = (id: string): Promise<{
  data: BootcampCategory;
}> => {
  return api.get(`/bootcamp/category/${id}`);
};
