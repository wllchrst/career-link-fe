import { api } from "~/lib/api-client";

export const sendAnnouncement = ({
  id,
}: {
  id: string
}): Promise<{ data: { id: string }; message: string }> => {
  return api.get(`/announcement/send_to_all_user/${id}`);
};