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
import type { Attendance } from "~/types/api"

export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data: attendances} = await getAttendanceBySession(params.session)
    const {data: session} = await getBootcampSession(params.session)
    
    return {attendances, session}
    
}

interface AttendanceRow {
    nim: string,
    name: string,
    clock_in: string,
    clock_out: string
}


const Attendances = ({loaderData}:Route.ComponentProps) => {
    
    const {attendances, session} = loaderData
    
    function transform(attendances: Attendance[]): AttendanceRow[] {
        return attendances.sort((a,b) => a.user.nim!.localeCompare(b.user.nim!)).reduce((acc, curr) => {
            let record = acc.find(e => e.nim === curr.user.nim)

            if (!record) {
                record = {
                    nim: curr.user.nim ?? "-",
                    name: curr.user.name,
                    clock_in: "",
                    clock_out: ""
                }
                acc.push(record)
            }
            if (curr.attendance_type === "clock_in") {
                record.clock_in = format(curr.finished_at, 'MM/dd/yyyy HH:mm:ss')
            } else if (curr.attendance_type === "clock_out") {
                record.clock_out = format(curr.finished_at, 'MM/dd/yyyy HH:mm:ss')
            }
            return acc
        }, [] as AttendanceRow[])
    }

    const exportResult = () => {
        exportToExcel(`${session.title}-attendance`, transform(attendances))
    }

    return (
    <div className="flex flex-col w-full gap-y-4 bg-white rounded-lg shadow-md p-5">
            <div className={'w-full flex items-center'}>
                <Link to={`/bootcamps/${session.bootcamp.id}/session/${session.id}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Session {session.session_number} Attendances</h2>
            </div>
            <Button onClick={exportResult} className="w-1/6">Export</Button>
            
            <TableLayout header={<DefaultTableHeader columns={["NIM", "Name", "Clock in", "Clock out"]}/>}>
                {
                attendances.length < 1?
                <EmptyMessage title="No Attendances" text="The students hasn't attend yet."/>:
                transform(attendances).map(e => 
                    <TableRow className="flex w-full border-b-1 border-gray-200">
                        <TableCell className="w-1/4 text-center">{e.nim ?? "-"}</TableCell>
                        <TableCell className="w-1/4 text-center">{e.name}</TableCell>
                        <TableCell className="w-1/4 text-center">{e.clock_in ? format(e.clock_in, 'MM/dd/yyyy HH:mm:ss'): "-"}</TableCell>
                        <TableCell className="w-1/4 text-center">{e.clock_out ? format(e.clock_out, 'MM/dd/yyyy HH:mm:ss'): "-"}</TableCell>
                    </TableRow>
                )
                }
            </TableLayout>
    </div>)
}

export default Attendances