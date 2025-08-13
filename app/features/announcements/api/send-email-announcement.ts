import { z } from "zod";
import { api } from "~/lib/api-client";

export const sendEmailAnnouncementInputSchema = z.object({
    subject: z.string().min(1, "Subject cant be empty"),
    body: z.string().min(1, "Body cant be empty"),
})

export type SendEmailAnnouncementInput = z.infer<typeof sendEmailAnnouncementInputSchema>

export const sendAnnouncement = ({
  data,
}: {
  data: SendEmailAnnouncementInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.get(`/email/test?subject=${data.subject}&body=${data.body}`);
};