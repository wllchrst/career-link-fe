import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateBootcampInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category_id: z.string().min(1, "Category ID is required"),
  type_id: z.string().min(1, "Type ID is required"),
  speaker_id: z.string().min(1, "Speaker name is required"),
  image_path: z.string().optional(),
  image_file: z.instanceof(File).refine(
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
  short_name: z.string(),
  about_this_bootcamp: z.string()
});

export type UpdateBootcampInput = z.infer<typeof updateBootcampInputSchema>;

export const updateBootcamp = ({
  data,
  bootcampId,
}: {
  data: UpdateBootcampInput;
  bootcampId: string;
}): Promise<{ message: string }> => {

  let formData = new FormData();
  
    for ( let key in data ) {
        formData.append(key, data[key]);
    }
    return api.post(`/bootcamp/${bootcampId}`, formData, {
      headers: {
        'Content-Type':'multipart/form-data'
      }
    });
};
