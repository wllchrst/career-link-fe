// /bootcamp/session_assignment_answer

import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateAssignmentAnswerInputSchema = z.object({
  answer_file_path: z.string().optional(),
  user_id: z.string().min(1, "User id cant be empty"),
  assignment_id: z.string().min(1, "Assignment id cant be empty"),
  answer_file: z.instanceof(File)
});

export type UpdateAssignmentAnswerInput = z.infer<typeof updateAssignmentAnswerInputSchema>;

export const updateAssignmentAnswer = ({
  data,id
}: {
  data: UpdateAssignmentAnswerInput;
  id: string;
}): Promise<{ data: { id: string }; message: string }> => {
  let formData = new FormData();
  formData.append("_method", "PUT")
  for (let key in data) {
    formData.append(key, data[key]);
  }
  console.log(formData.get('answer_file'))
  
  return api.post(`bootcamp/session_assignment_answer/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
};
