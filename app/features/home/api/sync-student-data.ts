import { api } from "~/lib/api-client";

export const syncUser = (): Promise<{ data: { id: string }; message: string }> => {
  return api.get("/admin/sync_user?strm=2420");
};
