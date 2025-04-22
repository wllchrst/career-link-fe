import { z } from "zod";
import { api } from "~/lib/api-client";
import type { BootcampCategory } from "~/types/api";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type CreateCategoryInput = z.infer<typeof categorySchema>;

export const createBootcampCategory = ({
  data,
}: {
  data: CreateCategoryInput;
}): Promise<{ data: BootcampCategory; message: string }> => {
  return api.post("/bootcamp/category", data);
};
