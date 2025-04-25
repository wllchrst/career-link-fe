import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import type { BootcampType } from "~/types/api";
import type { CreateBootcampTypeInput } from "../api/create-bootcamp-type";
import {
  type UpdateBootcampTypeInput,
  updateBootcampTypeInputSchema,
  updateBootcampType,
} from "../api/update-bootcamp-type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Field from "~/components/ui/form-field";

interface Props {
  onSuccess: () => void;
  selectedBootcampType: BootcampType;
}

export const UpdateBootcampType = ({
  onSuccess,
  selectedBootcampType,
}: Props) => {
  const form = useForm<UpdateBootcampTypeInput>({
    resolver: zodResolver(updateBootcampTypeInputSchema),
    defaultValues: {
      name: selectedBootcampType.name,
    },
  });

  const onSubmit = async (data: CreateBootcampTypeInput) => {
    const toastId = toast.loading("Updating bootcamp type...");

    try {
      const res = await updateBootcampType({
        data,
        typeId: selectedBootcampType.id,
      });
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
            {form.formState.isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
