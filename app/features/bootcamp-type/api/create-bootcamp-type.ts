import { z } from "zod";
import { api } from "~/lib/api-client";

export const createBootcampTypeInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateBootcampTypeInput = z.infer<
  typeof createBootcampTypeInputSchema
>;

export const createBootcampType = ({
  data,
}: {
  data: CreateBootcampTypeInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("/bootcamp/type", data);
};
