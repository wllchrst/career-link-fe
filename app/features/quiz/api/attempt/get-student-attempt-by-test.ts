import { api } from "~/lib/api-client";
import type { StudentAttempt } from "~/types/api";

export const getStudentAttemptByTest = (test_id:string, user_id:string): Promise<{ data:StudentAttempt[] }> => {
  return api.get(`bootcamp/test/get_student_attempt_by_test?user_id=${user_id}&test_id=${test_id}`);
};
