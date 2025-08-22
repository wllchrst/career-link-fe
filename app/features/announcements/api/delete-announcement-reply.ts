import { api } from "~/lib/api-client";

export const deleteAnnouncementReply = ({
  id
}: {
  id: string;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.delete(`/announcement/reply/${id}`);
};