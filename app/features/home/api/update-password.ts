import { z } from "zod";
import { api } from "~/lib/api-client";

export const updatePasswordInputSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(8, "New password must be at least 8 characters"),
  confirm_password: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export type UpdatePasswordInput = z.infer<typeof updatePasswordInputSchema>;

export const updatePassword = ({
  data,
  id
}: {
  data: UpdatePasswordInput;
  id: string;
}): Promise<{ message: string }> => {
  return api.patch(`user/password`, {
    password: data.current_password,
    new_password: data.new_password,
  });
};
