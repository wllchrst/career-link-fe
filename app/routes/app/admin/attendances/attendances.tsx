import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router"
import TableLayout from "~/components/layouts/table-layout"
import { Button } from "~/components/ui/button"
import EmptyMessage from "~/components/ui/empty-message"
import { TableCell, TableRow } from "~/components/ui/table"
import { DefaultTableHeader } from "~/components/ui/table-header"
import type { Route } from "./+types/attendances"
import { getAttendanceBySession } from "~/features/attendance/api/get-attendance-by-session"
import { format } from "date-fns"
import { getBootcampSession } from "~/features/session/api/get-session"
import { exportToExcel } from "~/lib/excel"

export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data: attendances} = await getAttendanceBySession(params.session)
    const {data: session} = await getBootcampSession(params.session)
    
    return {attendances, session}
    
}
const Attendances = ({loaderData}:Route.ComponentProps) => {

    const {attendances, session} = loaderData

    const exportResult = () => {
        exportToExcel(`${session.title}-result`, attendances.map(e => (
            {
                nim: e.user.nim,
                name: e.user.name,
                type: e.attendance_type,
                attendAt: format(e.finished_at, 'MM/dd/yyyy HH:mm:ss')
            }
        )))
    }

    return (
    <div className="flex flex-col w-full gap-y-4 bg-white rounded-lg shadow-md p-5">
            <div className={'w-full flex items-center'}>
                <Link to={`/session/${session.id}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Session {session.session_number} Attendances</h2>
            </div>
            <Button onClick={exportResult} className="w-1/6">Export</Button>
            
            <TableLayout header={<DefaultTableHeader columns={["NIM", "Name", "Type", "Attend at"]}/>}>
                {
                attendances.length < 1?
                <EmptyMessage title="No Attendances" text="The students hasn't attend yet."/>:
                attendances.map(e => 
                    <TableRow className="flex w-full border-b-1 border-gray-200">
                        <TableCell className="w-1/4 text-center">{e.user.nim ?? "-"}</TableCell>
                        <TableCell className="w-1/4 text-center">{e.user.name}</TableCell>
                        <TableCell className="w-1/4 text-center">{e.attendance_type}</TableCell>
                        <TableCell className="w-1/4 text-center">{format(e.finished_at, 'MM/dd/yyyy HH:mm:ss')}</TableCell>
                    </TableRow>
                )
                }
            </TableLayout>
    </div>)
}

export default Attendances