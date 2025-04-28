import { api } from "~/lib/api-client";
import type { BootcampType } from "~/types/api";

export const getBootcampType = (id:string): Promise<{ 
  data: BootcampType 
}> => {
  return api.get(`/bootcamp/type/${id}`);
};
