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