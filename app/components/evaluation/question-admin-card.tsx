import type { EvaluationQuestion } from "~/types/api"
import { Card } from "../ui/card"
import Field from "../ui/form-field"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import SelectField from "../ui/select-field"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { getErrorMessage } from "~/lib/error"
import { updateEvalQuestion, type UpdateEvalQuestionInput } from "~/features/evaluation/api/update-evaluation-question"

interface Props {
    idx: number,
    question: EvaluationQuestion
    onSuccess: () => void
}

const EvaluationCard = ({idx, question, onSuccess}:Props) => {

    let form = useForm<UpdateEvalQuestionInput>({
        defaultValues: question
    })

    let types = [
        {
            value: "ratio",
            text: "ratio"
        },
        {
            value: "text",
            text: "text"
        }
    ]

    const handleSubmit = async (data: UpdateEvalQuestionInput) => {
        const toastId = toast.loading(`Updating evaluation question...`);
        try {

            await updateEvalQuestion({
                data,
                id: question.id,
            })

            toast.success("Update evaluation question success", { id: toastId })
            onSuccess()
        } catch (error) {
            toast.error(getErrorMessage(error), {
            id: toastId,
            });
        }
    }


    return (
        <Card className="flex flex-row p-4 gap-2 w-full">
            <div className="w-full">
                <Form {...form}>
                    <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex justify-between w-full items-center gap-5 border-b-1 pb-5">
                            <h4 className="text-slate-700 text-xl font-bold p-0 m-0">{idx+1}.</h4>
                            
                            <Field control={form.control} label="" name="question" placeholder="Question" />
                            <div className="w-1/5 flex justify-center items-center">
                                <SelectField control={form.control} label="" name="type" values={types}/>
                            </div>

                        </div>
                        <div className="flex w-full gap-5 justify-end">
                            <Button className="w-1/5">Update</Button>
                            <Button className="w-1/5" variant={"destructive"}>Remove</Button>
                        </div>
                    </form>
                </Form>
            </div>
            

        </Card>
    )
}

export default EvaluationCard