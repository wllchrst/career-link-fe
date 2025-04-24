import { api } from "~/lib/api-client";

export const deleteBootcamp = (bootcampId: string) => {
  return api.delete(`/bootcamp/${bootcampId}`);
};
