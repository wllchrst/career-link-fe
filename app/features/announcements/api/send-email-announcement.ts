import { z } from "zod";
import { api } from "~/lib/api-client";

export const SendAnnouncementInputSchema = z.object({
  subject: z.string().min(1, "Subject cant be empty"),
  body: z.string().min(1, "Body cant be empty"),
  to: z.array(z.string()).min(1, "receiver cant be empty"),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  sender_signature: z.string().optional(),
})

export type SendAnnouncementInput = z.infer<typeof SendAnnouncementInputSchema>

type EmailRequestBody = {
  subject: string,
  body: string,
  to: string[],
  cc?: string[],
  bcc?: string[],
  sender_signature?: string
}

export const sendAnnouncement = ({
  data,
}: {
  data: SendAnnouncementInput
}): Promise<{ data: { id: string }; message: string }> => {
  let processedData:EmailRequestBody = {
    subject: data.subject,
    to: data.to,
    body: data.body,
  }
  
  if (data.sender_signature){
    processedData.sender_signature = data.sender_signature
  }
  if (data.cc){
    processedData.cc = data.cc.replace(' ', '').split(',')
  }
  if (data.bcc){
    processedData.bcc = data.bcc.replace(' ', '').split(',')
  }

  return api.post(`/email/detail`, processedData);
};