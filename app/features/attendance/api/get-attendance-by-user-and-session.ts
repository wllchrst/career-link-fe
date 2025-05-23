import { api } from "~/lib/api-client";
import type { Attendance } from "~/types/api";

export const getAttendanceByUserAndSession = (session_id:string, user_id:string): Promise<{ data: Attendance[] }> => {
  return api.get(`bootcamp/session_attendance/session/${session_id}/user/${user_id}`);
};
