import { api } from "~/lib/api-client";
import type { StudentScore } from "~/types/api";

export const getStudentAttemptByTest = (test_id:string, user_id:string): Promise<{ data:StudentScore[] }> => {
  return api.get(`bootcamp/session_test_score_with_attempt_user/user/${user_id}/test/${test_id}`);
};
