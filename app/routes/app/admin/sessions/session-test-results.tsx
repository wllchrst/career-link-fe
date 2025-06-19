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
import type { StudentScore } from "~/types/api"
import { getEnrollmentByBootcamp } from "~/features/enrollments/api/get-enrollment-by-bootcamp"



export const loader = async ({ params }: Route.LoaderArgs) => {
    
    const {data: attempts} = await getAllStudentAttemptByTest(params.test).catch(() => ({data: []}))
    const {data: test} = await getTest(params.test).catch(() => ({data: null}))
    const {data: enrollments} = await getEnrollmentByBootcamp(params.bootcamp).catch(() => ({data: []}))

    // return {attempts: attempts.sort((a,b) => a.user_id.localeCompare(b.user_id)).reduce((acc, item) => {
    //     if (acc.find(e => e.user_id == item.user_id) == undefined){
    //         let studentAttempts = attempts.filter(e => e.user_id == item.user_id)
    //         let maxScore = Math.max(...studentAttempts.map(e => e.score))
    //         let studentBestAttempt = studentAttempts.filter(e => e.score == maxScore)[0]
    
    //         acc.push(studentBestAttempt)
    //     }
    //     return acc
    // }, [] as StudentScore[]), 
    return {
        attempts: enrollments.map(enroll => {
            let studentAttempts = attempts.filter(e => e.user_id == enroll.user_id)
            let maxScore = Math.max(...studentAttempts.map(e => e.score), 0)
            let studentBestAttempt = studentAttempts.filter(e => e.score == maxScore)[0]
            
            return studentBestAttempt?studentBestAttempt:{
                user: enroll.user,
                score: 0,
                attempt: undefined,
            }
        }),
    test, session: params.session, bootcamp: params.bootcamp}
}

const SessionTestResults = ({loaderData}:Route.ComponentProps) => {

    const {attempts, test, session, bootcamp} = loaderData

    const exportResult = () => {
        exportToExcel(`${test?.title}-result`, attempts.map(e => (
            {
                nim: e.user.nim,
                name: e.user.name,
                doneAt: e.attempt? e.attempt.done_at: "-",
                score: Math.ceil(e.score),
                status: (e.score >= test!.minimum_score)? "Passed":"Not passed",
            }
        )))
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
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Test Result</h2>
            </div>
            {test && <TestInformationCard test={test}/>}
            <Button onClick={exportResult} className="w-1/6">Export</Button>
            <TableLayout header={<DefaultTableHeader columns={["NIM", "Name", "Done at", "Score", "Status"]}/>}>
                {
                attempts.length < 1?
                <EmptyMessage title="No Attempts" text="The students hasn't made any attempts yet."/>:
                attempts.map(e => 
                    <TableRow className="flex w-full border-b-1 border-gray-200">
                        <TableCell className="w-1/5 text-center">{e.user.nim ?? "-"}</TableCell>
                        <TableCell className="w-1/5 text-center">{e.user.name}</TableCell>
                        <TableCell className="w-1/5 text-center">{
                            e.attempt? format(new Date(e.attempt.done_at), "MM/dd/yyyy HH:mm:ss"):'-'
                        }</TableCell>
                        <TableCell className="w-1/5 text-center">{Math.ceil(e.score)}</TableCell>
                        <TableCell className="w-1/5 text-center">{(e.score >= test!.minimum_score)?"Passed":"Not passed"}</TableCell>
                    </TableRow>
                )
                }
            </TableLayout>
    </div>)
}

export default SessionTestResults