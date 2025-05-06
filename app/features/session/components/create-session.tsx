import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import Field from "~/components/ui/form-field";
import TextAreaField from "~/components/ui/text-area-field";
import type { Bootcamp } from "~/types/api";
import {
  createSession,
  createSessionInputSchema,
  type CreateSessionInput,
} from "../api/create-session";

interface Props {
  onSuccess: () => void;
  bootcamp: Bootcamp;
}

export const CreateSession = ({ onSuccess, bootcamp }: Props) => {
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionInputSchema),
    defaultValues: {
      title: "",
      description: "",
      session_number: "1",
      bootcamp_id: bootcamp.id,
    },
  });

  const onSubmit = async (data: CreateSessionInput) => {
    const toastId = toast.loading("Creating session...");
    try {
      const res = await createSession({ data });
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
          placeholder="Enter name"
          label="Name"
          type="text"
          name="title"
        />
        <TextAreaField
          control={form.control}
          placeholder="Enter description"
          label="Description"
          name="description"
        />
        <Field
          control={form.control}
          placeholder="Enter session number"
          label="Session number"
          type="number"
          name="session_number"
        />

        <div className="flex gap-10 justify-end">
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
