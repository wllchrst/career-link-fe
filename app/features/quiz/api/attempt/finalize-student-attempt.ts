import { z } from "zod";
import { api } from "~/lib/api-client";

export const finalizeStudentAttemptInputSchema = z.object({
    user_id: z.string().min(1, 'User Id is required'),
    test_id: z.string().min(1, 'Test Id is required')
});

export type FinalizeStudentAttemptInput = z.infer<typeof finalizeStudentAttemptInputSchema>;

export const finalizeStudentAttempt = ({
  data,
}: {
  data: FinalizeStudentAttemptInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/test/finalize_attempt", data);
};
