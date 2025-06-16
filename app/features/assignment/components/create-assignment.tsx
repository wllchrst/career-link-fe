import { zodResolver } from "@hookform/resolvers/zod";
import { createAssignment, createAssignmentInputSchema, type CreateAssignmentInput } from "../api/create-assignment";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import FileField from "~/components/ui/file-field";
import Field from "~/components/ui/form-field";

interface Props {
  onSuccess: () => void;
  sessionId: string;
}
const CreateAssignment = ( {sessionId, onSuccess}:Props ) => {
    const form = useForm<CreateAssignmentInput>({
        resolver: zodResolver(createAssignmentInputSchema),
        defaultValues: {
            session_id: sessionId,
            answer_file_path: "",
            question_file_path: "",
            is_shared: false,
        },
      });
    
      const onSubmit = async (data: CreateAssignmentInput) => {
        const toastId = toast.loading("Creating bootcamp...");
        try {
          const res = await createAssignment({ data });
          toast.success(res.message, { id: toastId });
          form.reset();
          onSuccess();
        } catch (error) {
          toast.error(getErrorMessage(error), {
            id: toastId,
          });
        }
      };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, name:"question_file_path"|"answer_file_path") => {
    const file = e.target.files?.[0];
    if (file) {
        form.setValue(name, file.name);
    }
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FileField control={form.control} handlePreview={(e) => {handleFile(e, "question_file_path")}} label="Question File" name="question_file"/>
            <FileField control={form.control} handlePreview={(e) => {handleFile(e, "answer_file_path")}} label="Answer File" name="answer_file"/>
            <Field
                control={form.control}
                name="is_shared"
                type="checkbox"
                label="Shared"
            />

            <div className="flex gap-5 justify-end">
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

    )
}

export default CreateAssignment