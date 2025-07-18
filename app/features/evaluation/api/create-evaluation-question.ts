import { z } from "zod";
import { api } from "~/lib/api-client";

export const createEvalQuestionInputSchema = z.object({
  question: z.string().min(1, "Question is required"),
  session_id: z.string().min(1, "Session id is required"),
});

export type CreateEvalQuestionInput = z.infer<typeof createEvalQuestionInputSchema>;

export const createEvalQuestion = ({
  data,
}: {
  data: CreateEvalQuestionInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/session_evaluation_question", data);
};
