import { api } from "~/lib/api-client";
import type { Announcement } from "~/types/api";

export const getAnnouncements = (): Promise<{ data: Announcement[] }> => {
  return api.get("/announcement");
};
