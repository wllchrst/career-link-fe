import { api } from "~/lib/api-client";
import type { AnnouncementReply } from "~/types/api";

export const getAnnouncementReplyByUser = ({
    userId
}:{
    userId:string
}): Promise<{ data: AnnouncementReply[] }> => {
  return api.get(`/announcement/reply/user/${userId}`);
};
