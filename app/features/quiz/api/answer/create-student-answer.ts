import { z } from "zod";
import { api } from "~/lib/api-client";

export const createStudentAnswerInputSchema = z.object({
    user_id: z.string().min(1, 'User Id is required'),
    question_id: z.string().min(1, 'Question Id is required'),
    option_id: z.string().min(1, 'Option Id is required'),
    attempt_id: z.string().min(1, 'Attempt Id is required'),
});

export type CreateStudentAnswerInput = z.infer<typeof createStudentAnswerInputSchema>;

export const createStudentAnswer = ({
  data,
}: {
  data: CreateStudentAnswerInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/session_student_answer", data);
};
