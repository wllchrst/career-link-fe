import { api } from "~/lib/api-client";
import type { AssignmentResult } from "~/types/api";
import { z } from "zod";
import { AssignmentResultType } from "~/types/enum";

export const createAssignmentResultInputSchema = z.object({
  assignment_id: z.string().min(1, "Assignment ID is required"),
  user_id: z.string().min(1, "Student ID is required"),
  result: z.nativeEnum(AssignmentResultType),
});

export type CreateAssignmentResultInput = z.infer<typeof createAssignmentResultInputSchema>;

export const createAssignmentResult = ({data}:{data:CreateAssignmentResultInput}): Promise<{ data: { id: string }; message: string }> => {
  return api.post(`bootcamp/session_assignment_result`, {...data, result: data.result.replace(' ', '_').toLowerCase() });
};
