import { useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useRevalidator } from "react-router";
import { exportToExcel, importExcel } from "~/lib/excel";
import type { AssignmentAnswer, AssignmentResult, Enrollment } from "~/types/api";
import { AssignmentResultType } from "~/types/enum";
import { updateAssignmentResult } from "../api/result/update-assignment-result";
import { createAssignmentResult } from "../api/result/create-assignment-result";
import { getErrorMessage } from "~/lib/error";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { DefaultTableHeader } from "~/components/ui/table-header";
import TableLayout from "~/components/layouts/table-layout";
import EmptyMessage from "~/components/ui/empty-message";
import AssignmentAnswerRow from "~/components/assignment/assignment-answer-row";

interface Props {
    assignment: string;
    enrollments: Enrollment[];
    results: Record<string, AssignmentResult>;
    answers: Record<string, AssignmentAnswer>;
}

interface Template {
    nim: string,
    name: string,
    result: AssignmentResultType,
}

const AssignmentAnswerGrid = ({assignment, enrollments, results, answers}:Props) => {

    const revalidator = useRevalidator();
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    

    const mappingGrade=  async (res:Template[]) => {
        const toastId = toast.loading("Grading students...");
        try {
            for (let i = 0; i < res.length; i++){
                if (res[i].result !== AssignmentResultType.NO_FILE){
                    const user = enrollments[i].user
                    const data = {
                        result: res[i].result,
                        user_id: user.id,
                        assignment_id: assignment,
                    }
                    if (results[user.id]){
                        await updateAssignmentResult({ data, id: results[user.id].id })
                    }else{
                        await createAssignmentResult({ data })
                    }
                }
                setProgress(prev => prev + 100 / res.length);
            }
            toast.success("Student grades has successfully imported", { id: toastId });
            setTimeout(() => {
                setProgress(0)
                revalidator.revalidate()
            }, 3000);
        } catch (error) {
        toast.error(getErrorMessage(error), {
            id: toastId,
        });
        }finally{
            if (fileInputRef.current){
                fileInputRef.current.value = "";
            }
        }

    }
    
    const importGrade = (e:ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = (event) => importExcel<Template>(event, (res) => mappingGrade(res))
        reader.readAsArrayBuffer(e.target.files![0])
    }
    
    const exportResult = () => {
        exportToExcel(`${assignment}-grading-result`, enrollments.map(e => ({
            nim: e.user.nim ?? "-",
            name: e.user.name,
            result: results[e.user_id] ? results[e.user_id].result : "No file",
        })))
    }
    const exportTemplate = () => {
        exportToExcel(`${assignment}-grading-template`, enrollments.map(e => ({
            nim: e.user.nim ?? "-",
            name: e.user.name,
            result: answers[e.user_id] ? (results[e.user_id]? results[e.user_id].result : "") : "No file",
        })))
    }

    return (
        <>
            <div className="flex gap-3">
                <Button onClick={exportResult} className="w-1/5 bg-slate-600 hover:bg-slate-500">Export</Button>
                <Button className="w-1/5 bg-orange-600 hover:bg-orange-500" onClick={exportTemplate}>Download Grading Template</Button>
                <label htmlFor="file" className="bg-green-600 hover:bg-green-500 px-2 w-1/5 rounded-md text-white text-sm font-medium flex items-center justify-center">
                    Import Excel
                </label>
                <input ref={fileInputRef} type="file" name="" id="file" hidden onChange={importGrade}/>
            </div>
            {progress > 0 && <Progress value={progress} className="w-full"/>}
            <TableLayout header={<DefaultTableHeader columns={["NIM", "Name", "Answer", "Result"]}/>}>
                {
                enrollments.length < 1?
                <EmptyMessage title="No Student" text="There is no students yet."/>:
                enrollments.map(e => 
                    <AssignmentAnswerRow 
                        user={e.user}
                        assignment_id={assignment}
                        answerFilePath={answers[e.user_id] ? answers[e.user_id].answer_file_path : undefined}
                        result={results[e.user_id]}
                    />
                )
                }
            </TableLayout>
        </>
    )
}

export default AssignmentAnswerGrid;