import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import Field from "~/components/ui/form-field";
import { createTest, createTestInputSchema, type CreateTestInput } from "../api/create-test";
import { QuizType } from "~/types/enum";

interface Props {
  onSuccess: () => void;
  sessionId: string;
  quizType: QuizType;
}

export const CreateTest = ({onSuccess, quizType, sessionId}: Props) => {

    const form = useForm<CreateTestInput>({
        resolver: zodResolver(createTestInputSchema),
        defaultValues: {
            title: "",
            session_id: sessionId,
            type: quizType
        },
    });

    const onSubmit = async (data: CreateTestInput) => {
        
        const toastId = toast.loading(`Creating ${data.type.replace('_', ' ')}...`);
        try {
          const res = await createTest({ data });
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
                <>
                  <Field control={form.control} placeholder="Enter name" label="Name" type="text" name="title"/>
                </>
            
              <div className="flex gap-5 justify-end">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className={
                    `bg-accent ${form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`
                  }
                >
                  {form.formState.isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        );
}