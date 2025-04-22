import { api } from "~/lib/api-client";

export const deleteBootcampCategory = (categoryId: string) => {
  return api.delete(`/bootcamp/category/${categoryId}`);
};
