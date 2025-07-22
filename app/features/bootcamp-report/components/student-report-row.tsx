import { DownloadIcon } from "lucide-react";
import TooltipLayout from "~/components/layouts/tooltip-layout";
import { Button } from "~/components/ui/button";
import { TableCell, TableRow } from "~/components/ui/table";
import type { Enrollment, StudentAttempt, User } from "~/types/api";
import { AssignmentResultType, TestType } from "~/types/enum";

interface Props {
  idx: number;
  cur: number;
  e: Enrollment;
}

const displayOrDash = (value?: string, limit = 10) => {
  if (!value || value.trim() === "") return "-";
  if (value.length <= limit) return value;
  return value.slice(0, limit) + "...";
};

const StudentReportRow = ({ idx, cur, e }: Props) => {
  return (
    <TableRow className="shadow-md p-5 border-box bg-white rounded-lg items-center my-2 flex w-full">
      <TableCell className="w-[3%] font-medium text-center">
        {idx + (cur - 1) * 10 + 1}
      </TableCell>

      <TableCell className="w-[12%] text-center">{e?.user.nim ?? "-"}</TableCell>

      <TableCell className="w-[15%] text-center whitespace-normal break-words">
        {e?.user.name ?? "-"}
      </TableCell>

      <TableCell className="w-[8%] text-center">
        {e?.user.session_attendances.filter(e => e.attendance_type == 'clock_in').length ?? "-"}
      </TableCell>

      <TableCell className="w-[8%] text-center">
        {e?.user.session_attendances.filter(e => e.attendance_type == 'clock_out').length ?? "-"}
      </TableCell>

      <TableCell className="w-[16%] text-center whitespace-normal break-words">
        {Object.values(e?.user.student_attempts.filter(e => e.test.type == TestType.PRE_TEST).reduce<Record<string, StudentAttempt>>((prev, curr) => {
            const target = prev[curr.test_id]
            if (!target){
                prev[curr.test_id] = curr
            }
            return prev
        }, {})).length ?? "-"}
      </TableCell>
      <TableCell className="w-[12%] text-center whitespace-normal break-words">
        {Object.values(e?.user.student_attempts.filter(e => e.test.type == TestType.POST_TEST).reduce<Record<string, StudentAttempt>>((prev, curr) => {
            const target = prev[curr.test_id]
            if (!target || (target.score && curr.score && target.score < curr.score)){
                prev[curr.test_id] = curr
            }
            return prev
        }, {})).length ?? "-"}
      </TableCell>
      <TableCell className="w-[16%] text-center whitespace-normal break-words">
        {e?.user.session_assignment_results.filter(e => e.result == AssignmentResultType.AVERAGE).length ?? "-"}
      </TableCell>

      <TableCell className="w-[12%] text-center whitespace-normal break-words">
        {e?.user.session_assignment_results.filter(e => e.result == AssignmentResultType.GOOD).length ?? "-"}
      </TableCell>
    </TableRow>
  );
};

export default StudentReportRow;
