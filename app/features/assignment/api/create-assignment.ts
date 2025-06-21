import { z } from "zod";
import { api } from "~/lib/api-client";

export const createAssignmentInputSchema = z.object({
  session_id: z.string().min(1, "Session ID is required"),
  answer_file_path: z.string().optional(),
  is_shared: z.boolean(),
  open_date: z.date(),
  close_date: z.date(),
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
  answer_file: z.instanceof(File).refine(
      (file) =>
        [
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/pdf",
          "text/plain",
          "application/zip"
        ].includes(file.type),
      { message: "Invalid answer file type" }
    )
});

export type CreateAssignmentInput = z.infer<typeof createAssignmentInputSchema>;

export const createAssignment = ({
  data,
}: {
  data: CreateAssignmentInput;
}): Promise<{ data: { id: string }; message: string }> => {
  let formData = new FormData();

  for (let key in data) {
    if (key === 'is_shared') {
      formData.append(key, data[key] == true ? "1" : "0");
    }else{
      formData.append(key, data[key]);
    }
  }
  console.log("Form Data:", formData.get("is_shared"));
  return api.post("/bootcamp/session_assignment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
