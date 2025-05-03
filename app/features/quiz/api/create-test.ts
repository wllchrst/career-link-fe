import { z } from "zod";
import { api } from "~/lib/api-client";
import { QuizType } from "~/types/enum";

export const createTestInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.nativeEnum(QuizType),
  session_id: z.string().min(1, "Session id is required")
});

export type CreateTestInput = z.infer<typeof createTestInputSchema>;

export const createTest = ({
  data,
}: {
  data: CreateTestInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/session_test", data);
};
