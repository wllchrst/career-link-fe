import { z } from "zod";
import { api } from "~/lib/api-client";

export const createBootcampInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  about_this_bootcamp: z.string().min(1, "About This Bootcamp is required"),
  short_name: z.string().min(1, "Short name is required"),
  description: z.string().min(1, "Description is required"),
  category_id: z.string().min(1, "Category ID is required"),
  type_id: z.string().min(1, "Type ID is required"),
  speaker_id: z.string().min(1, "Speaker ID is required"),
  image_path: z.string().optional(),
  image_file: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    ),
});

export type CreateBootcampInput = z.infer<typeof createBootcampInputSchema>;

export const createBootcamp = ({
  data,
}: {
  data: CreateBootcampInput;
}): Promise<{ data: { id: string }; message: string }> => {
  let formData = new FormData();

  for (let key in data) {
    const value = data[key as keyof CreateBootcampInput];

    if (value !== undefined) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  }

  return api.post("/bootcamp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
