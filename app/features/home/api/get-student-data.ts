import { api } from "~/lib/api-client";
import type { User } from "~/types/api";

export const getUsers = (page:number, size?:number): Promise<{ data: User[], meta: {last_page: number} }> => {
  return api.get(`/user/paginate?page=${page}&per_page=${size}`);
};
