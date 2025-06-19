import { api } from "~/lib/api-client";
import type { StudentScore } from "~/types/api";

export const getAllStudentAttemptByTest = (test_id:string): Promise<{ data:StudentScore[] }> => {
  return api.get(`bootcamp/session_test_score_with_attempt_user/test/${test_id}`);
};
