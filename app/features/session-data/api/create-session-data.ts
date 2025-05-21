import { z } from "zod";
import { api } from "~/lib/api-client";

export const createSessionDataInputSchema = z.object({
  description: z.string().min(1, "Description is required"),
  link: z.string().min(1, "Link is required"),
  session_id: z.string().min(1, "Session id is required")
})

export type CreateSessionDataInput = z.infer<typeof createSessionDataInputSchema>;

export const createSessionData = ({
  data,
}: {
  data: CreateSessionDataInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/session_data", data);
};
