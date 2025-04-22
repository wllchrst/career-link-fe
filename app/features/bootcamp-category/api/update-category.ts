import { z } from "zod";
import { api } from "~/lib/api-client";
import type { BootcampCategory } from "~/types/api";

export const updateCategoryInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;

export const createBootcampCategory = ({
  data,
  categoryId,
}: {
  data: UpdateCategoryInput;
  categoryId: string;
}): Promise<{ data: BootcampCategory; message: string }> => {
  return api.post(`/bootcamp/category/${categoryId}`, data);
};
