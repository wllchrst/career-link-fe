import { api } from "~/lib/api-client";
import type { AnnouncementReply } from "~/types/api";

export const getAnnouncementReplyByAnnouncement = ({
    announcementId
}:{
    announcementId:string
}): Promise<{ data: AnnouncementReply[] }> => {
  return api.get(`/announcement/${announcementId}/reply`);
};
