import { useForm } from "react-hook-form";
import {
  updateBootcampCategory,
  updateCategoryInputSchema,
  type UpdateCategoryInput,
} from "../api/update-bootcamp-category";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { getErrorMessage } from "~/lib/error";
import type { CreateCategoryInput } from "../api/create-bootcamp-category";
import type { BootcampCategory } from "~/types/api";

interface Props {
  onSuccess: () => void;
  selectedCategory: BootcampCategory;
}

export const UpdateBootcampCategory = ({
  onSuccess,
  selectedCategory,
}: Props) => {
  const form = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategoryInputSchema),
    defaultValues: {
      name: selectedCategory.name,
      description: selectedCategory.description,
    },
  });

  const onSubmit = async (data: CreateCategoryInput) => {
    const toastId = toast.loading("Updating category...");

    try {
      const res = await updateBootcampCategory({
        data,
        categoryId: selectedCategory.id,
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
