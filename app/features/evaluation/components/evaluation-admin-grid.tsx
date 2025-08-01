import { useRef, useState, type ChangeEvent } from "react"
import toast from "react-hot-toast"
import { Button } from "~/components/ui/button"
import { getErrorMessage } from "~/lib/error"
import { exportToExcel, importExcel } from "~/lib/excel"
import { createEvalQuestion } from "../api/create-evaluation-question"
import { Progress } from "~/components/ui/progress"
import type { EvaluationQuestion } from "~/types/api"
import EvaluationCard from "~/components/evaluation/question-admin-card"


interface Template {
    number: number,
    question: string,
    type: string,
}


interface Props {
    sessionId: string,
    id: string,
    onSuccess: () => void,
    questions: EvaluationQuestion[]
}


const EvaluationAdminGrid = ({sessionId, id, onSuccess, questions}: Props) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [progress, setProgress] = useState(0)

    
    const template: Template[]  = [{
        number: 1,
        question: "Rate your satisfaction on this bootcamp session",
        type: "ratio"
    }]
    const importEval =  (e:ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = (event) => importExcel<Template>(event, async (res) => {
            const toastId = toast.loading(`Importing Test...`);
            try {
                for (let i = 0;i< res.length;i++){
                    setProgress(prev => prev + 100 / res.length);
                    await createEvalQuestion({ 
                        data: {
                            question: res[i].question,
                            session_id: sessionId,
                            type: res[i].type
                        }
                    });
                }
                setProgress(100);
                toast.success("Import Test Success!", { id: toastId })
                onSuccess()
            } catch (error) {
                toast.error(getErrorMessage(error), {
                    id: toastId,
                });
            }finally {
                setTimeout(() => {
                    setProgress(0)
                    if (fileInputRef.current){
                        fileInputRef.current.value = "";
                    }
                }, 3000);
            }
        })
        reader.readAsArrayBuffer(e.target.files![0])
    }
    

    return (
        <>
            <div className="flex justify-between items-start gap-10 w-full">
                <div className="w-3/5 p-2">
                    {progress > 0 && <Progress value={progress} className="w-full"/>}
                    <div className="flex flex-col gap-5">
                        {
                            questions.map((e,idx) => <>
                                <EvaluationCard onSuccess={onSuccess} idx={idx} question={e} />
                            </>)
                        }
                            <div className="flex flex-col gap-5">
                                {questions.map(e => <div>{e.question}</div>)}
                            </div>
                        
                    </div>
                </div>
                <div className="flex grid grid-cols-2 gap-5 w-2/5 bg-white rounded-lg shadow-md p-5">
                    
                    <Button onClick={() => exportToExcel('template', template)} className="bg-purple-500 hover:bg-purple-400">
                        Download Template
                    </Button>
                    <label htmlFor="file" className="bg-green-600 hover:bg-green-500 px-2 text-sm rounded-md text-white flex items-center justify-center">
                        Import Evaluation
                    </label>
                    <input type="file" name="" id="file" ref={fileInputRef} hidden onChange={importEval}/>
                </div>
            </div>
        </>
    )
}

export default EvaluationAdminGrid