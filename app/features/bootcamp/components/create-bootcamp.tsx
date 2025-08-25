import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import {
  createBootcamp,
  createBootcampInputSchema,
  type CreateBootcampInput,
} from "../api/create-bootcamp";
import Field from "~/components/ui/form-field";
import TextAreaField from "~/components/ui/text-area-field";
import FileField from "~/components/ui/file-field";
import { useState } from "react";
import SelectField from "~/components/ui/select-field";
import type { BootcampCategory, BootcampType, User } from "~/types/api";

interface Props {
  onSuccess: () => Promise<void>;
  categories: BootcampCategory[];
  types: BootcampType[];
  speakers: User[];
}

export const CreateBootcamp = ({
  onSuccess,
  categories,
  types,
  speakers,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [stage, setStage] = useState<number>(0);

  const form = useForm<CreateBootcampInput>({
    resolver: zodResolver(createBootcampInputSchema),
    defaultValues: {
      name: "",
      short_name: "",
      description: "",
      category_id: "",
      image_path: "",
      type_id: "",
      speaker_id: "",
    },
  });

  const onSubmit = async (data: CreateBootcampInput) => {
    const toastId = toast.loading("Creating bootcamp...");
    try {
      console.log(data.image_file);
      const res = await createBootcamp({ data });
      toast.success(res.message, { id: toastId });
      form.reset();
      await onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error), {
        id: toastId,
      });
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image_path", file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {stage == 0 ? (
          <>
            <Field
              control={form.control}
              placeholder="Enter name"
              label="Name"
              type="text"
              name="name"
            />
            <Field
              control={form.control}
              placeholder="Enter short name"
              label="Short name"
              type="text"
              name="short_name"
            />
            <TextAreaField
              control={form.control}
              placeholder="Enter description"
              label="Description"
              name="description"
            />
            <FileField
              control={form.control}
              handlePreview={handleImagePreview}
              label="Bootcamp Image"
              name="image_file"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-4 w-full max-h-32 object-cover rounded-md border"
              />
            )}
          </>
        ) : (
          <>
            <SelectField
              control={form.control}
              name="category_id"
              label="Category"
              values={categories.map((e) => ({
                value: e.id,
                text: e.name,
              }))}
            />
            <SelectField
              control={form.control}
              name="type_id"
              label="Type"
              values={types.map((e) => ({
                value: e.id,
                text: e.name,
              }))}
            />
            <SelectField
              control={form.control}
              name="speaker_id"
              label="Speaker"
              values={speakers.map((e) => ({
                value: e.id,
                text: e.name,
              }))}
            />
          </>
        )}
        <div className="flex gap-5 justify-end">
          {stage == 0 ? (
            <Button
              type="button"
              disabled={form.formState.isSubmitting}
              className={`bg-accent ${
                form.formState.isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => setStage(1)}
            >
              {"Next"}
            </Button>
          ) : (
            <Button
              type="button"
              disabled={form.formState.isSubmitting}
              onClick={() => setStage(0)}
              className={`bg-accent ${
                form.formState.isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {"Back"}
            </Button>
          )}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={`bg-accent ${
              form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
