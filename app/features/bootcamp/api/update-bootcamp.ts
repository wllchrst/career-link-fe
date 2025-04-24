import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateBootcampInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category_id: z.string().min(1, "Category ID is required"),
  type_id: z.string().min(1, "Type ID is required"),
  speaker_id: z.string().min(1, "Speaker ID is required"),
  image_path: z.string().optional(),
});

export type UpdateBootcampInput = z.infer<typeof updateBootcampInputSchema>;

export const updateBootcamp = ({
  data,
  bootcampId,
}: {
  data: UpdateBootcampInput;
  bootcampId: string;
}): Promise<{ message: string }> => {
  return api.put(`/bootcamp/${bootcampId}`, data);
};
