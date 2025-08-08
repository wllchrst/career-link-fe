import { api } from "~/lib/api-client";

export const deleteAnnouncement = ({
  id
}: {
  id: string;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.delete(`/announcement/${id}`);
};