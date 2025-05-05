import { z } from "zod";
import { api } from "~/lib/api-client";

export const createTestQuestionInputSchema = z.object({
  question: z.string().min(1, "Question is required"),
  test_id: z.string().min(1, "Session test id is required"),
  options: z.array(z.object({
    option: z.string().min(1, 'Option is required'),
    is_answer: z.boolean(),
    question_id: z.string()
  }))
}).refine(data => {
    if (data.options.filter(e => e.is_answer).length != 1) return false
    return true
  },{message: "The correct answer must be one", path: ['question']}
);

export type CreateTestQuestionInput = z.infer<typeof createTestQuestionInputSchema>;

export const createTestQuestion = ({
  data,
}: {
  data: CreateTestQuestionInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/session_test_question", data);
};
