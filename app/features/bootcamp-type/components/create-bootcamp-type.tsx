import { useForm } from "react-hook-form";
import {
  createBootcampType,
  createBootcampTypeInputSchema,
  type CreateBootcampTypeInput,
} from "../api/create-bootcamp-type";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Field from "~/components/ui/form-field";

interface Props {
  onSuccess: () => void;
}

export const CreateBootcampType = ({ onSuccess }: Props) => {
  const form = useForm<CreateBootcampTypeInput>({
    resolver: zodResolver(createBootcampTypeInputSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateBootcampTypeInput) => {
    const toastId = toast.loading("Creating bootcamp type...");
    try {
      const res = await createBootcampType({ data });
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
        <Field control={form.control} placeholder="Enter name" label="Name" type="text" name="name"/>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={
              form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }
          >
            {form.formState.isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
