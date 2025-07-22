import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateEvalQuestionInputSchema = z.object({
  id: z.string().min(1, "Id is required"),
  question: z.string().min(1, "Question is required"),
  session_id: z.string().min(1, "Session id is required"),
  type:  z.string().min(1, "Type is required"),
});

export type UpdateEvalQuestionInput = z.infer<typeof updateEvalQuestionInputSchema>;

export const updateEvalQuestion = ({
  data,
  id
}: {
  data: UpdateEvalQuestionInput;
  id: string;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.put(`bootcamp/session_evaluation_question/${id}`, data);
};
