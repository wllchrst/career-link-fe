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


export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data: answers} = await getAssignmentAnswerByAssignment(params.assignment).catch(() => ({data: []}))
    const { data: assignment } = await getAssignment(params.session).catch(() => ({data: undefined}));
    
    return {answers, assignment, session: params.session}
    
}

const AssignmentAnswers = ({loaderData}:Route.ComponentProps) => {


    const {answers, assignment, session} = loaderData
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
            
            <TableLayout header={<DefaultTableHeader columns={["NIM", "Name", "Answer", "Score"]}/>}>
                {
                answers.length < 1?
                <EmptyMessage title="No Answer" text="The students hasn't made any answers yet."/>:
                answers.map(e => 
                    <TableRow className="flex w-full border-b-1 border-gray-200">
                        <TableCell className="w-1/4 text-center">{e.id ?? "-"}</TableCell>
                        <TableCell className="w-1/4 text-center">{e.user_id}</TableCell>
                        <TableCell className="w-1/4 text-center flex justify-center"><a href={`${import.meta.env.VITE_STORAGE_URL}/${e.answer_file_path}`}>
                            <Download />
                        </a></TableCell>
                        <TableCell className="w-1/4 text-center">100</TableCell>
                    </TableRow>
                )
                }
            </TableLayout>
    </div>)
}

export default AssignmentAnswers