import { getAssignmentAnswerByAssignment } from "~/features/assignment/api/answer/get-assignment-answer-by-assignment"
import type { Route } from "./+types/assignment-answers"
import { Link, useRevalidator } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { DefaultTableHeader } from "~/components/ui/table-header";
import TableLayout from "~/components/layouts/table-layout";
import EmptyMessage from "~/components/ui/empty-message";
import { Button } from "~/components/ui/button";
import { exportToExcel, importExcel } from "~/lib/excel";
import type { AssignmentAnswer, AssignmentResult } from "~/types/api";
import { getAssignmentResultByAssignment } from "~/features/assignment/api/result/get-assignment-result-by-assignment";
import { getEnrollmentByBootcamp } from "~/features/enrollments/api/get-enrollment-by-bootcamp";
import AssignmentAnswerRow from "~/components/assignment/assignment-answer-row";
import { useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { Progress } from "~/components/ui/progress";
import { createAssignmentResult } from "~/features/assignment/api/result/create-assignment-result";
import { updateAssignmentResult } from "~/features/assignment/api/result/update-assignment-result";
import { AssignmentResultType } from "~/types/enum";

export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data: answers} = await getAssignmentAnswerByAssignment(params.assignment).catch(() => ({data: []}))
    const {data: results} = await getAssignmentResultByAssignment(params.assignment).catch(() => ({data: []}))
    const {data: enrollments} = await getEnrollmentByBootcamp(params.bootcamp).catch(() => ({data: []}));
    
    return {
        answers: answers.reduce((acc, item) => {
            acc[item.user_id] = item;
            return acc;  
        }, {} as Record<string, AssignmentAnswer>), 
        results: results.reduce((acc, item) => {
            acc[item.user_id] = item;
            return acc;
        }, {} as Record<string, AssignmentResult>), 
        enrollments, 
        assignment: params.assignment, 
        session: params.session, 
        bootcamp: params.bootcamp}
    
}

interface Template {
    nim: string,
    name: string,
    result: AssignmentResultType,
}


const AssignmentAnswers = ({loaderData}:Route.ComponentProps) => {

    const {answers,enrollments, assignment, results, session, bootcamp} = loaderData
    const revalidator = useRevalidator();
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    

    const mappingGrade=  async (res:Template[]) => {
        const toastId = toast.loading("Grading students...");
    try {
        for (let i = 0; i < res.length; i++){
            const user = enrollments[i].user
            if (res[i].result !== AssignmentResultType.NO_FILE){
                if (results[user.id]){
                    await updateAssignmentResult({
                        data: {
                            result: res[i].result,
                            user_id: user.id,
                            assignment_id: assignment,
                        },
                        id: results[user.id].id
                    })
                }else{
                    await createAssignmentResult({
                        data: {
                            result: res[i].result,
                            user_id: user.id,
                            assignment_id: assignment,
                        }
                    })
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
    <div className="flex flex-col w-full gap-y-4 bg-white rounded-lg shadow-md p-5">
            <div className={'w-full flex items-center'}>
                <Link to={`/bootcamps/${bootcamp}/session/${session}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Assignment Answers</h2>
            </div>
            <div className="flex gap-3">
                <Button onClick={exportResult} className="w-1/5 bg-slate-600 hover:bg-slate-500">Export</Button>
                <Button className="w-1/5 bg-orange-600 hover:bg-orange-500" onClick={exportTemplate}>Download Grading Template</Button>
                <label htmlFor="file" className="bg-green-600 hover:bg-green-500 px-2 rounded-md text-white text-sm font-medium flex items-center justify-center">
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
    </div>)
}

export default AssignmentAnswers