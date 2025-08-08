import { api } from "~/lib/api-client";
import type { Announcement } from "~/types/api";

export const getAnnouncement = ({
    id
}:{
    id:string
}): Promise<{ data: Announcement }> => {
  return api.get(`/announcement/${id}`);
};
