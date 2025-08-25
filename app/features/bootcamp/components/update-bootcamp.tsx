import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import Field from "~/components/ui/form-field";
import TextAreaField from "~/components/ui/text-area-field";
import FileField from "~/components/ui/file-field";
import { useEffect, useState } from "react";
import SelectField from "~/components/ui/select-field";
import type { Bootcamp, BootcampCategory, BootcampType, User } from "~/types/api";
import { updateBootcamp, updateBootcampInputSchema, type UpdateBootcampInput } from "../api/update-bootcamp";

interface Props {
  bootcamp: Bootcamp;
  onSuccess: () => Promise<void>;
  categories: BootcampCategory[];
  types: BootcampType[];
  speakers: User[];
}

export const UpdateBootcamp = ({bootcamp, onSuccess, categories, types, speakers}: Props) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(bootcamp.image_path);    
    const [stage, setStage] = useState<number>(0);

    

    const form = useForm<UpdateBootcampInput>({
        resolver: zodResolver(updateBootcampInputSchema),
        defaultValues: {
            name: bootcamp.name,
            description: bootcamp.description,
            category_id: bootcamp.category_id,
            image_path: bootcamp.image_path,
            type_id: bootcamp.type_id,
            speaker_id: 'sdf',
        },
    });

    async function createFile(){
      let response = await fetch(`${import.meta.env.VITE_STORAGE_URL}/${bootcamp.image_path}`);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg'
      };
      const file = new File([data], previewUrl ?? "image.jpeg", metadata);
    }

    useEffect(() => {
      createFile()
    })
    
    const onSubmit = async (data: UpdateBootcampInput) => {
        
        const toastId = toast.loading("Updating bootcamp...");
        try {
          const res = await updateBootcamp({ bootcampId: bootcamp.id, data });
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
          form.setValue("image_path", file.name)
          setPreviewUrl(URL.createObjectURL(file));
        }
      };

      

      return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      
              {stage == 0?
                <>
                  <Field control={form.control} placeholder="Enter name" label="Name" type="text" name="name"/>
                  <TextAreaField  control={form.control} placeholder="Enter description" label="Description" name="description"/>
                  <FileField control={form.control} handlePreview={handleImagePreview} label="Bootcamp Image" name="image_file"/>
                  {previewUrl && (
                    <img
                      src={`${import.meta.env.VITE_STORAGE_URL}/${previewUrl}`}
                      alt="Preview"
                      className="mt-4 w-full max-h-32 object-cover rounded-md border"
                    />
                  )}
                </>:
                <>
                  <SelectField control={form.control} name="category_id" label="Category" values={
                    categories.map(e => ( {
                      value: e.id,
                      text: e.name
                    }))
                  }/>
                  <SelectField control={form.control} name="type_id" label="Type" values={
                    types.map(e => ( {
                      value: e.id,
                      text: e.name
                    }))
                  }/>
                  <SelectField control={form.control} name="speaker_id" label="Speaker" values={
                    speakers.map(e => ( {
                      value: e.id,
                      text: e.name
                    }))
                  }/>
                </>
              }
              <div className="flex gap-10 justify-end">
                {
                  stage==0?

                  <Button
                    type="button"
                    disabled={form.formState.isSubmitting}
                    className={
                      form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }
                    onClick={() => setStage(1)}
                  >
                    {"Next"}
                  </Button>:
                  <Button
                    type="button"
                    disabled={form.formState.isSubmitting}
                    onClick={() => setStage(0)}
                    className={
                      form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }
                  >
                    {"Back"}
                  </Button>
                }
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
}