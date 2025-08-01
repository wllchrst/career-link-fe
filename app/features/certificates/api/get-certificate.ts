import { api } from "~/lib/api-client";
import type { Certificate } from "~/types/api";

export const getCertificate = (id:string): Promise<{ data: Certificate }> => {
  return api.get(`bootcamp/certificate/${id}`);
};
