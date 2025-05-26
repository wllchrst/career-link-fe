import { z } from "zod";
import { api } from "~/lib/api-client";

export const createAssignmentInputSchema = z.object({
  session_id: z.string().min(1, "Session ID is required"),
  answer_file_path: z.string().optional(),
  question_file_path: z.string().optional(),
  question_file: z.instanceof(File).refine(
      (file) =>
        [
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/pdf",
          "text/plain",
          "application/zip"
        ].includes(file.type),
      { message: "Invalid question file type" }
    ),
  answer_file: z.instanceof(File)
});

export type CreateAssignmentInput = z.infer<typeof createAssignmentInputSchema>;

export const createAssignment = ({
  data,
}: {
  data: CreateAssignmentInput;
}): Promise<{ data: { id: string }; message: string }> => {
  let formData = new FormData();

  for (let key in data) {
    formData.append(key, data[key]);
  }
  return api.post("/bootcamp/session_assignment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
