//'sdf', 'william', 'william@gmail.com', 'william'

import { z } from "zod";
import { api } from "~/lib/api-client";
import type { User } from "~/types/api";

export const updateStudentInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  nim: z.string().min(1, "NIM is required"),
  future_position: z.string().min(1, "Future Position is required"),
  phone: z.string().min(1, "Phone is required"),
  major: z.string().min(1, "Major is required"),
  password: z.string(),
  skill: z.string().min(1, "Skill is required"),
});

export type UpdateStudentDataInput = z.infer<typeof updateStudentInputSchema>;

export const updateStudentData = ({
  data,
  id
}: {
  data: UpdateStudentDataInput;
  id: string;
}): Promise<{ data: User; message: string }> => {
  return api.put(`/user/${id}`, data);
};
