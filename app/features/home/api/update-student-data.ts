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
  skill: z.string().min(1, "Skill is required"),
  cv_file: z.instanceof(File),
});

export type UpdateStudentDataInput = z.infer<typeof updateStudentInputSchema>;

export const updateStudentData = ({
  data,
  id
}: {
  data: UpdateStudentDataInput;
  id: string;
}): Promise<{ data: User; message: string }> => {

  let formData = new FormData();
  
    for (let key in data) {
      const value = data[key as keyof UpdateStudentDataInput];
      
      if (value !== undefined) {
        console.log(key, value)
        formData.append(key, value instanceof File ? value : String(value));
      }
    }
    
  return api.post(`/user/${id}`, formData);
};
