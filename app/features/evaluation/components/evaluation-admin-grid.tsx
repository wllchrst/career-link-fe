import type { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { Button } from "~/components/ui/button"
import { getErrorMessage } from "~/lib/error"
import { exportToExcel, importExcel } from "~/lib/excel"
import { createEvalQuestion } from "../api/create-evaluation-question"


interface Template {
    number: number,
    question: string,
}


interface Props {
    sessionId: string,
    id: string,
    onSuccess: () => void,
}


const EvaluationAdminGrid = ({sessionId, id, onSuccess}: Props) => {

    const template: Template[]  = [{
        number: 1,
        question: "Rate your satisfaction"
    }]
    const importEval =  (e:ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = (event) => importExcel<Template>(event, async (res) => {
            const toastId = toast.loading(`Importing Test...`);
            try {
                await Promise.all(res.map(async (e) => {
                    await createEvalQuestion({ 
                        data: {
                            question: e.question,
                            session_id: sessionId
                        }
                     });
                }))
                toast.success("Import Test Success!", { id: toastId })
            } catch (error) {
                toast.error(getErrorMessage(error), {
                id: toastId,
                });
            }
        })
        reader.readAsArrayBuffer(e.target.files![0])
    }
    

    return (
        <>
            
            <div className="flex justify-between items-start gap-10 w-full">
                <div className="w-3/5">
                    <div className="flex flex-col gap-5">
                    
                    </div>
                </div>
                <div className="flex grid grid-cols-2 gap-5 w-2/5 bg-white rounded-lg shadow-md p-5">
                    
                    <Button onClick={() => exportToExcel('template', template)} className="bg-purple-500 hover:bg-purple-400">
                        Download Template
                    </Button>
                    <label htmlFor="file" className="bg-green-600 hover:bg-green-500 px-2 rounded-md text-white flex items-center justify-center">
                        Import Evaluation
                    </label>
                    <input type="file" name="" id="file" hidden onChange={importEval}/>
                </div>
            </div>
        </>
    )
}

export default EvaluationAdminGrid