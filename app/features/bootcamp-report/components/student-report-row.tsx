import { DownloadIcon } from "lucide-react";
import { useState } from "react";
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

const displayMaxScoreAttempt = (attempts: StudentAttempt[]) => {
  let res = Object.values(attempts.reduce<Record<string, StudentAttempt>>((prev, curr) => {
      const target = prev[curr.test_id]
      if (!target || (target.score && curr.score && target.score < curr.score)){
          prev[curr.test_id] = curr
      }
      return prev
  }, {}))
  return res
}

const validateEligibility = (enrollment: Enrollment) => {
  
  let clockInCount = enrollment.user.session_attendances.filter(e => e.attendance_type == 'clock_in').length 
  let clockOutCount = enrollment.user.session_attendances.filter(e => e.attendance_type == 'clock_in').length
  let assignmentSubmittedCount = enrollment.user.session_assignment_results.length
  let preTestSubmitted = displayMaxScoreAttempt(enrollment.user.student_attempts.filter(e => e.test.type == TestType.PRE_TEST)).length
  let assignmentGradeACount = enrollment.user.session_assignment_results.filter(e => e.result == AssignmentResultType.GOOD).length
  let postTestPassed = displayMaxScoreAttempt(enrollment.user.student_attempts.filter(e => e.test.type == TestType.POST_TEST)).filter(e => e.score && e.score.score >= e.test.minimum_score).length

  if (Math.max(clockInCount, clockOutCount, assignmentGradeACount, preTestSubmitted, assignmentSubmittedCount, postTestPassed) == 0) {
    return 0
  }
  return 1
}

const StudentReportRow = ({ idx, cur, e }: Props) => {
  let [isEligible, _] = useState(validateEligibility(e)) 
  return (
    <TableRow className={`shadow-md p-5 border-box bg-white rounded-lg items-center my-2 flex w-full ${isEligible?"":"bg-red-200 hover:bg-red-300"}`}>
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

      <TableCell className="w-[11%] text-center whitespace-normal break-words">
        {displayMaxScoreAttempt(e?.user.student_attempts.filter(e => e.test.type == TestType.PRE_TEST)).length}
      </TableCell>
      <TableCell className="w-[11%] text-center whitespace-normal break-words">
        {displayMaxScoreAttempt(e?.user.student_attempts.filter(e => e.test.type == TestType.POST_TEST)).filter(e => e.score && e.score.score >= e.test.minimum_score).length}
      </TableCell>
      <TableCell className="w-[11%] text-center whitespace-normal break-words">
        {e?.user.session_assignment_results.length ?? "-"}
      </TableCell>

      <TableCell className="w-[11%] text-center whitespace-normal break-words">
        {e?.user.session_assignment_results.filter(e => e.result == AssignmentResultType.GOOD).length ?? "-"}
      </TableCell>
      <TableCell className="w-[11%] text-center whitespace-normal break-words">
        <Button disabled={!isEligible} variant={`${isEligible?"outline":"destructive"}`}>
          Generate
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default StudentReportRow;
