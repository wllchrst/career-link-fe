import type { EvaluationQuestion } from "~/types/api"
import { Card } from "../ui/card"
import Field from "../ui/form-field"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import type { CreateEvalQuestionInput } from "~/features/evaluation/api/create-evaluation-question"
import SelectField from "../ui/select-field"
import { Button } from "../ui/button"

interface Props {
    idx: number,
    question: EvaluationQuestion
}

const EvaluationCard = ({idx, question}:Props) => {

    let form = useForm<CreateEvalQuestionInput>({
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


    return (
        <Card className="flex flex-row p-4 gap-2 w-full">
            <div className="w-full">
                <Form {...form}>
                    <form className="flex flex-col gap-5">
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