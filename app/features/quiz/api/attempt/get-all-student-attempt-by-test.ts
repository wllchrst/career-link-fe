import { api } from "~/lib/api-client";
import type { StudentAttempt } from "~/types/api";

export const getAllStudentAttemptByTest = (test_id:string): Promise<{ data:StudentAttempt[] }> => {
  return api.get(`bootcamp/test/get_student_attempt_by_test?test_id=${test_id}`);
};
