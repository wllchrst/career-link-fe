import { useForm } from "react-hook-form"
import { createTestQuestion, createTestQuestionInputSchema, type CreateTestQuestionInput } from "../api/create-test-question";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import Field from "~/components/ui/form-field";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { createQuestionOption } from "../api/create-question-option";


interface Props {
    sessionTestId: string;
    number: string;
}

const CreateQuestion = ({sessionTestId, number}:Props) => {

    const form = useForm<CreateTestQuestionInput>({
        resolver: zodResolver(createTestQuestionInputSchema),
        defaultValues: {
            question: "",
            test_id: sessionTestId,
            options: [
                {option:"", is_answer: false, question_id: ""},
                {option:"", is_answer: false, question_id: ""},
                {option:"", is_answer: false, question_id: ""},
                {option:"", is_answer: false, question_id: ""},
            ]
        },
    });

    const onSubmit = async (data: CreateTestQuestionInput) => {
        
        const toastId = toast.loading(`Creating Question ${number}...`);
        try {
          const res = await createTestQuestion({ data });

          for (let i = 0;i < data.options.length;i++){
                data.options[i].question_id = res.data.id
                await createQuestionOption({data: data.options[i]})
          }  
          toast.success(res.message, { id: toastId })
        } catch (error) {
          toast.error(getErrorMessage(error), {
            id: toastId,
          });
        }
      };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <>
                        <Field control={form.control} placeholder="Enter question" label={`Question ${number}`} type="text" name="question"/>
                    </>
                    <div className="grid grid-cols-2 gap-2">
                        {form.getValues('options').map((_,idx) => <div className="flex gap-2 justify-start">
                            <Field control={form.control} label="" type="checkbox" name={`options.${idx}.is_answer`}/>
                            <Field control={form.control} placeholder="Enter option" label="" type="text" name={`options.${idx}.option`}/>
                        </div>)}
                    </div>
                    <div className="flex gap-5 justify-end">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className={
                            `bg-accent ${form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`
                            }
                        >
                            {form.formState.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default CreateQuestion