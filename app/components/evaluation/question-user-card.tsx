import type { EvaluationQuestion } from "~/types/api"
import { Card } from "../ui/card"
import { Textarea } from "../ui/textarea"

interface Props {
    idx: number,
    question: EvaluationQuestion,
    setAnswer: (idx: number, answer:string) => void
}

const EvaluationCard = ({setAnswer, idx, question}:Props) => {

    return (
        <Card className="flex flex-row p-4 gap-2 w-full">
            <div className="w-full">
                <div> {/* TODO: Form */}
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between w-full items-center gap-5 border-b-1 pb-2">
                            <h4 className="text-slate-700 text-lg font-bold p-0 m-0">{idx+1}. {question.question}</h4>
                        </div>
                        <div className="w-full flex justify-between">
                            {   question.type == 'ratio' ?
                                Array.from({ length: 5 }, (_, index) => index + 1).map((_, index) => 
                                    <div className="flex gap-2 w-full flex-col items-center">
                                        <h4 className="text-slate-700 text-lg font-bold p-0 m-0">{index + 1}</h4>
                                        <input type="radio" name={`question-${idx}`} id="" onChange={() => setAnswer(idx, `${index + 1}`)}/>
                                    </div>
                                ):
                                <Textarea placeholder={"evaluation here..."} onChange={e => setAnswer(idx, e.target.value)}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            

        </Card>
    )
}

export default EvaluationCard