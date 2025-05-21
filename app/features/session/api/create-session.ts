import { z } from "zod";
import { api } from "~/lib/api-client";

export const createSessionInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  session_number: z.number(),
  bootcamp_id: z.string().min(1, "Bootcamp ID is required"),
});

export type CreateSessionInput = z.infer<typeof createSessionInputSchema>;

export const createSession = ({
  data,
}: {
  data: CreateSessionInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("/bootcamp/session", data);
};
