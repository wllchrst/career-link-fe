// /bootcamp/session_assignment_answer

import { z } from "zod";
import { api } from "~/lib/api-client";

export const createAssignmentAnswerInputSchema = z.object({
  answer_file_path: z.string().optional(),
  user_id: z.string().min(1, "User id cant be empty"),
  assignment_id: z.string().min(1, "Assignment id cant be empty"),
  answer_file: z.instanceof(File)
});

export type CreateAssignmentAnswerInput = z.infer<typeof createAssignmentAnswerInputSchema>;

export const createAssignmentAnswer = ({
  data,
}: {
  data: CreateAssignmentAnswerInput;
}): Promise<{ data: { id: string }; message: string }> => {
  let formData = new FormData();

  for (let key in data) {
    console.log(key)
    formData.append(key, data[key]);
  }
  console.log(formData)

  return api.post("bootcamp/session_assignment_answer", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
