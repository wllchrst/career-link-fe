import { getAllStudentAttemptByTest } from "~/features/quiz/api/attempt/get-all-student-attempt-by-test"
import type { Route } from "./+types/session-test-results"
import TableLayout from "~/components/layouts/table-layout"
import { DefaultTableHeader } from "~/components/ui/table-header"
import EmptyMessage from "~/components/ui/empty-message"
import { getTest } from "~/features/quiz/api/get-test"
import { FaArrowLeft } from "react-icons/fa"
import TestInformationCard from "~/components/test/test-information-card"
import { Link } from "react-router"
import { TableCell, TableRow } from "~/components/ui/table"
import { format } from "date-fns"
import { Button } from "~/components/ui/button"
import { exportToExcel } from "~/lib/excel"



export const loader = async ({ params }: Route.LoaderArgs) => {
    
    const {data: attempts} = await getAllStudentAttemptByTest(params.test).catch(() => ({data: []}))
    const {data: test} = await getTest(params.test).catch(() => ({data: null}))

    return {attempts, test, session: params.session}
}

const SessionTestResults = ({loaderData}:Route.ComponentProps) => {

    const {attempts, test, session} = loaderData

    const exportResult = () => {
        exportToExcel(`${test?.title}-result`, attempts.map(e => (
            {
                nim: e.user.nim,
                name: e.user.name,
                doneAt: e.done_at,
                attempt: 1,
                score: 100
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
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Test Result</h2>
            </div>
            {test && <TestInformationCard test={test}/>}
            <Button onClick={exportResult} className="w-1/6">Export</Button>
            <TableLayout header={<DefaultTableHeader columns={["NIM", "Name", "Attempt", "Done at", "Score"]}/>}>
                {
                attempts.length < 1?
                <EmptyMessage title="No Attempts" text="The students hasn't made any attempts yet."/>:
                attempts.map(e => 
                    <TableRow className="flex w-full border-b-1 border-gray-200">
                        <TableCell className="w-1/5 text-center">{e.user.nim ?? "-"}</TableCell>
                        <TableCell className="w-1/5 text-center">{e.user.name}</TableCell>
                        <TableCell className="w-1/5 text-center">1</TableCell>
                        <TableCell className="w-1/5 text-center">{format(new Date(e.done_at), "MM/dd/yyyy HH:mm:ss")}</TableCell>
                        <TableCell className="w-1/5 text-center">100</TableCell>
                    </TableRow>
                )
                }
            </TableLayout>
    </div>)
}

export default SessionTestResults