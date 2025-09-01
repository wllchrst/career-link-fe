import { z } from "zod";
import { api } from "~/lib/api-client";

export const SendAnnouncementInputSchema = z.object({
  subject: z.string().min(1, "Subject cant be empty"),
  body: z.string().min(1, "Body cant be empty"),
  to: z.array(z.string()).min(1, "receiver cant be empty"),
  cc: z.array(z.string()).optional(),
  bcc: z.array(z.string()).optional(),
  sender_signature: z.string().optional(),
})

export type SendAnnouncementInput = z.infer<typeof SendAnnouncementInputSchema>

export const sendAnnouncement = ({
  data,
}: {
  data: SendAnnouncementInput
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post(`/email/detail`, data);
};