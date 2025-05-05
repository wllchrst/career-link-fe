import { z } from "zod";
import { api } from "~/lib/api-client";

export const createStudentAttemptInputSchema = z.object({
    user_id: z.string().min(1, 'User Id is required'),
    test_id: z.string().min(1, 'Test Id is required')
});

export type CreateStudentAttemptInput = z.infer<typeof createStudentAttemptInputSchema>;

export const createStudentAttempt = ({
  data,
}: {
  data: CreateStudentAttemptInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("test/create_attempt", data);
};
