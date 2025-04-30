import { api } from "~/lib/api-client";
import type { User } from "~/types/api";

export const getUsers = (page:number, perPage:number): Promise<{ data: User[], meta: {last_page: number} }> => {
  return api.get(`/user/paginate?page=${page}&per_page=${perPage}`);
};
