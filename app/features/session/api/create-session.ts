import { z } from "zod";
import { api } from "~/lib/api-client";

export const createSessionInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  session_number: z.string().min(1, "Session number is required"),
  bootcamp_id: z.string().min(1, 'Bootcamp ID is required'),
  start_attendance_date: z.date().min(new Date(), "Date must not current date or before"),
  end_date: z.date().min(new Date(), "Date must not current date or before"),
});

export type CreateSessionInput = z.infer<typeof createSessionInputSchema>;

export const createSession = ({
  data,
}: {
  data: CreateSessionInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("/bootcamp/session", data);
};
