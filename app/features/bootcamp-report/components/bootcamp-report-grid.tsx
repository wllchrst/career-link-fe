import TableLayout from "~/components/layouts/table-layout"
import EmptyMessage from "~/components/ui/empty-message"
import { ReportDataTableHeader } from "~/components/ui/table-header"
import { compare } from "~/lib/utils"
import type { Enrollment } from "~/types/api"
import StudentReportRow from "./student-report-row"

interface Props {
    enrollments: Enrollment[]
}

const BootcampReportGrid = ({enrollments}:Props) => {
    

    
    return (<>
        {/* <div className="flex items-center gap-10">
            <h4 className="text-2xl font-semibold">Legend:</h4>
            <div className="flex gap-5 items-center">
                <span className="w-5 h-5 border-black border-1"></span>
                <h4 className="text-xl">Eligible for certificate</h4>
            </div>
            <div className="flex gap-5 items-center">
                <span className="w-5 h-5 border-black border-1 bg-red-200"></span>
                <h4 className="text-xl">Not Eligible for certificate</h4>
            </div>
        </div> */}

        {
            enrollments.length < 1 ? <EmptyMessage text="There is no enrolled student here" title="No Enrolled Student"/>:
            <TableLayout
                header = {<ReportDataTableHeader />}
            >
                {enrollments.sort((a, b) => compare(a.user.nim ?? '', b.user.nim ?? '')).map(
                (e, idx) => (
                    <StudentReportRow cur={1} idx={idx} e={e}/>
                )
                )}
            </TableLayout>
        }
    </>)
}

export default BootcampReportGrid