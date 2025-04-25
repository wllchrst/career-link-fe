import { useForm } from "react-hook-form";
import {
  createCategoryInputSchema,
  createBootcampCategory,
  type CreateCategoryInput,
} from "~/features/bootcamp-category/api/create-bootcamp-category";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import Field from "~/components/ui/form-field";
import TextAreaField from "~/components/ui/text-area-field";

interface Props {
  onSuccess: () => void;
}

export const CreateBootcampCategory = ({ onSuccess }: Props) => {
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategoryInputSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateCategoryInput) => {
    const toastId = toast.loading("Creating category...");
    try {
      const res = await createBootcampCategory({ data });
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
        <TextAreaField  control={form.control} placeholder="Enter description" label="Description" name="description"/>
        
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
