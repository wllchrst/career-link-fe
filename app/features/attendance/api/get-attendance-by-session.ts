import { api } from "~/lib/api-client";
import type { Attendance } from "~/types/api";

export const getAttendanceBySession = (session_id:string): Promise<{ data: Attendance[] }> => {
  return api.get(`bootcamp/session_attendance/session/${session_id}`);
};
