import { useForm } from "react-hook-form";
import { updatePassword, updatePasswordInputSchema, type UpdatePasswordInput } from "../api/update-password";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { Form } from "~/components/ui/form";
import Field from "~/components/ui/form-field";
import { Button } from "~/components/ui/button";
import type { User } from "~/types/api";

interface Props {
  onSuccess: () => void;
  user: User;
}

const UpdatePassword = ({ user, onSuccess }: Props) => {
  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordInputSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: UpdatePasswordInput) => {
    const toastId = toast.loading("Updating password...");

    try {
      const res = await updatePassword({ data, id: user.id });
      toast.success(res.message, { id: toastId });

      form.reset();

      onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error), {
        id: toastId,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Field
          control={form.control}
          placeholder="Enter current password"
          label="Current Password"
          type="password"
          name="current_password"
        />
        <Field
          control={form.control}
          placeholder="Enter new password"
          label="New Password"
          type="password"
          name="new_password"
        />
        <Field
          control={form.control}
          placeholder="Confirm new password"
          label="Confirm Password"
          type="password"
          name="confirm_password"
        />
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={
              form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }
          >
            {form.formState.isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePassword;
