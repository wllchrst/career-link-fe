import { z } from "zod";
import { api } from "~/lib/api-client";

export const createEvalAnswerInputSchema = z.object({
  question_id: z.string().min(1, "Question is required"),
  session_id: z.string().min(1, "Session id is required"),
  answer:  z.string().min(1, "Answer is required"),
});

export type CreateEvalAnswerInput = z.infer<typeof createEvalAnswerInputSchema>;

export const createEvalAnswer = ({
  data,
}: {
  data: CreateEvalAnswerInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/session_evaluation_answer", data);
};
  