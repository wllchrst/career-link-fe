import { z } from "zod";
import { api } from "~/lib/api-client";

export const createAnnouncementReplyInputSchema = z.object({
    user_id: z.string().min(1, "user id cant be empty"),
    announcement_id: z.string().min(1, "announcement id cant be empty"),
    content: z.string().min(1, "content cant be empty"),
})

export type CreateAnnouncementReplyInput = z.infer<typeof createAnnouncementReplyInputSchema>

export const updateAnnouncementReply = ({
    id,
    data,
}: {
    id: string;
    data: CreateAnnouncementReplyInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.put(`/announcement/reply/${id}`, data);
};