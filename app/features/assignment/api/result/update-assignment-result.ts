import { api } from "~/lib/api-client";
import type { CreateAssignmentResultInput } from "./create-assignment-result";

export const updateAssignmentResult = ({data, id}:{data:CreateAssignmentResultInput, id:string}): Promise<{ data: { id: string }; message: string }> => {
  return api.put(`bootcamp/session_assignment_result/${id}`, {...data, result: data.result.replace(' ', '_').toLowerCase() });
};
