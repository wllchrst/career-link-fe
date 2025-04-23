import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateBootcampTypeInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type UpdateBootcampTypeInput = z.infer<
  typeof updateBootcampTypeInputSchema
>;

export const updateBootcampType = ({
  data,
  typeId,
}: {
  data: UpdateBootcampTypeInput;
  typeId: string;
}): Promise<{ message: string }> => {
  return api.put(`/bootcamp/type/${typeId}`, data);
};
