import { api } from "~/lib/api-client";

export const deleteBootcampType = (typeId: string) => {
  return api.delete(`/bootcamp/type/${typeId}`);
};
