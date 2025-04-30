import { api } from "~/lib/api-client";

export const syncUser = (): Promise<{ data: { id: string }; message: string }> => {
  return api.post("/admin/sync_user?strm=2420");
};
