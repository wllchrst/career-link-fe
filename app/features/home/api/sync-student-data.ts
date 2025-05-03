import { api } from "~/lib/api-client";

export const syncUser = (): Promise<{ data: { id: string }; message: string }> => {
  return api.get("/admin/sync_user/2420");
};
