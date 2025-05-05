import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateTestQuestionInputSchema = z.object({
  question: z.string().min(1, "Question is required"),
  test_id: z.string().min(1, "Session test id is required"),
  options: z.array(z.object({
    option: z.string().min(1, 'Option is required'),
    is_answer: z.coerce.boolean(),
    question_id: z.string()
  }))
}).refine(data => {
    if (data.options.filter(e => e.is_answer).length != 1) return false
    return true
  },{message: "The correct answer must be one", path: ['question']}
);

export type UpdateTestQuestionInput = z.infer<typeof updateTestQuestionInputSchema>;

export const updateTestQuestion = ({
  data,
  id
}: {
  data: UpdateTestQuestionInput;
  id: string;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.put(`bootcamp/session_test_question/${id}` , data);
};
