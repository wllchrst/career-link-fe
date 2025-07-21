import TableLayout from "~/components/layouts/table-layout"
import EmptyMessage from "~/components/ui/empty-message"
import { MasterDataTableHeader } from "~/components/ui/table-header"
import StudentRow from "~/features/home/components/student-row"
import { compare } from "~/lib/utils"
import type { Enrollment } from "~/types/api"

interface Props {
    enrollments: Enrollment[]
}

const BootcampReportGrid = ({enrollments}:Props) => {
    

    
    return (<>
        {
            enrollments.length < 1 ? <EmptyMessage text="There is no enrolled student here" title="No Enrolled Student"/>:
            <TableLayout
                header = {<MasterDataTableHeader />}
            >
                {enrollments.sort((a, b) => compare(a.user.nim ?? '', b.user.nim ?? '')).map(
                (e, idx) => (
                    <StudentRow cur={1} idx={idx} e={e.user}/>
                )
                )}
            </TableLayout>
        }
    </>)
}

export default BootcampReportGrid