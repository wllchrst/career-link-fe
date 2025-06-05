import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateSessionInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  session_number: z.string().min(1, "Session number is required"),
  bootcamp_id: z.string().min(1, 'Bootcamp ID is required'),
  start_attendance_date: z.date().min(new Date(), "Date must not current date or before"),
  duration: z.string().min(1, "Duration is required")
});

export type UpdateSessionInput = z.infer<typeof updateSessionInputSchema>;

export const updateSession = ({
  data, id
}: {
  data: UpdateSessionInput; id: string
}): Promise<{ data: { id: string }; message: string }> => {

  return api.put(`/bootcamp/session/${id}`, data);
};
