import { z } from "zod";
import { api } from "~/lib/api-client";

export const createBootcampInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category_id: z.string().min(1, "Category ID is required"),
  type_id: z.string().min(1, "Type ID is required"),
  speaker_id: z.string().min(1, "Speaker ID is required"),
  image_path: z.string().optional(),
});

export type CreateBootcampInput = z.infer<typeof createBootcampInputSchema>;

export const createBootcamp = ({
  data,
}: {
  data: CreateBootcampInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("/bootcamp", data);
};
