import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateSessionDataInputSchema = z.object({
  description: z.string().min(1, "Description is required"),
  link: z.string().min(1, "Link is required"),
  session_id: z.string().min(1, "Session id is required")
})

export type UpdateSessionDataInput = z.infer<typeof updateSessionDataInputSchema>;

export const updateSessionData = ({
  data,id
}: {
  data: UpdateSessionDataInput;
  id: string;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.put(`bootcamp/session_data/${id}`, data);
};
