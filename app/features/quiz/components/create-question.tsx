import { useForm } from "react-hook-form"
import { createTestQuestion, createTestQuestionInputSchema, type CreateTestQuestionInput } from "../api/question/create-test-question";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import Field from "~/components/ui/form-field";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { createQuestionOption } from "../api/option/create-question-option";
import type { Question } from "~/types/api";
import { updateTestQuestion } from "../api/question/update-test-question";
import { updateQuestionOption } from "../api/option/update-question-option";


interface Props {
    sessionTestId: string;
    number: number;
    question?: Question | undefined;
    onDelete: (idx:number, question?:Question|undefined) => void;
    onSuccess: () => void;
}

const CreateQuestion = ({sessionTestId, number, question, onDelete, onSuccess}:Props) => {

    const form = useForm<CreateTestQuestionInput>({
        resolver: zodResolver(createTestQuestionInputSchema),
        defaultValues: question ?? {
            question: "",
            number: number,
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
        
        const toastId = toast.loading(`${question? "Updating":"Creating"} Question ${number}...`);
        try {
          const res = question? 
          await updateTestQuestion({ data, id: question.id }):
          await createTestQuestion({ data });

          for (let i = 0;i < data.options.length;i++){
                data.options[i].question_id = res.data.id
                question ? 
                await updateQuestionOption({data: data.options[i], id: question.options[i].id}): 
                await createQuestionOption({data: data.options[i]})
          }  
          toast.success(res.message, { id: toastId })
          onSuccess()
        } catch (error) {
          toast.error(getErrorMessage(error), {
            id: toastId,
          });
        }
      };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full bg-white shadow-lg rounded-md p-5">
                    <>
                        <Field control={form.control} placeholder="Enter question" label={`Question ${number}`} type="text" name="question"/>
                    </>
                    <div className="grid grid-cols-2 gap-2">
                        {form.getValues('options').map((e,idx) => <div key={e.question_id+idx} className="grid grid-cols-10">
                            <Field control={form.control} label="" type="checkbox" name={`options.${idx}.is_answer`} className="border border-black flex justify-center items-center"/>
                            <div className="col-span-9">
                                <Field control={form.control} placeholder="Enter option" label="" type="text" name={`options.${idx}.option`} />
                            </div>
                        </div>)}
                    </div>
                    <div className="flex gap-5 justify-end">
                        <Button type="submit" disabled={form.formState.isSubmitting}
                            className={
                            `bg-accent ${form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`
                            }>
                            {form.formState.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                        {question && <Button variant={'destructive'} type="button" onClick={() => onDelete(number, question)}>Delete Question</Button>}
                    </div>
                </form>
            </Form>
        </>
    )
}

export default CreateQuestion