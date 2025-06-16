import { getAssignmentAnswerByAssignment } from "~/features/assignment/api/answer/get-assignment-answer-by-assignment"
import type { Route } from "./+types/assignment-answers"
import { getAssignment } from "~/features/assignment/api/get-assignment";
import { TableCell, TableRow } from "~/components/ui/table";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { DefaultTableHeader } from "~/components/ui/table-header";
import TableLayout from "~/components/layouts/table-layout";
import EmptyMessage from "~/components/ui/empty-message";
import { Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import { exportToExcel } from "~/lib/excel";
import type { AssignmentResult } from "~/types/api";
import { getAssignmentResultByAssignment } from "~/features/assignment/api/result/get-assignment-result-by-assignment";
import SelectField from "~/components/ui/select-field";
import { getEnrollmentByBootcamp } from "~/features/enrollments/api/get-enrollment-by-bootcamp";

export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data: answers} = await getAssignmentAnswerByAssignment(params.assignment).catch(() => ({data: []}))
    const {data: results} = await getAssignmentResultByAssignment(params.assignment).catch(() => ({data: []}))
    const { data: assignment } = await getAssignment(params.session).catch(() => ({data: undefined}));
    
    return {answers, assignment, results: results.reduce((acc, item) => {
        acc[item.user_id] = item;
        return acc;
    }, {} as Record<string, AssignmentResult>), session: params.session}
    
}

const AssignmentAnswers = ({loaderData}:Route.ComponentProps) => {

    const {answers, assignment, results, session} = loaderData
    
    const exportResult = () => {
        exportToExcel(`${assignment?.id}-result`, answers.map(e => (
            {
                nim: e.user.nim,
                name: e.user.name,
                status: 'passed',
            }
        )))
    }
    return (
    <div className="flex flex-col w-full gap-y-4 bg-white rounded-lg shadow-md p-5">
            <div className={'w-full flex items-center'}>
                <Link to={`/session/${session}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Assignment Answers</h2>
            </div>
            <div className="flex gap-3">
                <Button onClick={exportResult} className="w-1/5 bg-slate-600 hover:bg-slate-500">Export</Button>
                <Button onClick={exportResult} className="w-1/5 bg-orange-600 hover:bg-orange-500">Download Grading Template</Button>
                <Button onClick={exportResult} className="w-1/5 bg-green-600 hover:bg-green-500">Upload Grade</Button>
            </div>
            
            <TableLayout header={<DefaultTableHeader columns={["NIM", "Name", "Answer", "Result"]}/>}>
                {
                answers.length < 1?
                <EmptyMessage title="No Answer" text="The students hasn't made any answers yet."/>:
                answers.map(e => 
                    <TableRow className="flex w-full border-b-1 border-gray-200">
                        <TableCell className="w-1/4 text-center">{e.user.nim ?? "-"}</TableCell>
                        <TableCell className="w-1/4 text-center">{e.user.name}</TableCell>
                        <TableCell className="w-1/4 text-center flex justify-center"><a href={`${import.meta.env.VITE_STORAGE_URL}/${e.answer_file_path}`}>
                            <Download />
                        </a></TableCell>
                        <TableCell className="w-1/4 text-center">{results[e.user_id] ?  results[e.user_id].result : "Not graded"}</TableCell>
                    </TableRow>
                )
                }
            </TableLayout>
    </div>)
}

export default AssignmentAnswers