import { z } from "zod";
import { api } from "~/lib/api-client";

export const createStudentAttendanceInputSchema = z.object({
    user_id: z.string().min(1, 'User Id is required'),
    session_id: z.string().min(1, 'Session Id is required'),
    attendance_type: z.enum(["clock_in", "clock_out"]),
});

export type CreateStudentAttendanceInput = z.infer<typeof createStudentAttendanceInputSchema>;

export const createStudentAttendance = ({
  data,
}: {
  data: CreateStudentAttendanceInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/session_attendance", data);
};
