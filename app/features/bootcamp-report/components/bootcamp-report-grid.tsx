import TableLayout from "~/components/layouts/table-layout"
import EmptyMessage from "~/components/ui/empty-message"
import { ReportDataTableHeader } from "~/components/ui/table-header"
import { compare } from "~/lib/utils"
import type { Enrollment, StudentAttempt } from "~/types/api"
import StudentReportRow from "./student-report-row"
import { Button } from "~/components/ui/button"
import { useState } from "react"
import { AssignmentResultType, CertificateType, TestType } from "~/types/enum"
import toast from "react-hot-toast"
import { createCertificate } from "~/features/certificates/api/create-certificate"
import { Progress } from "~/components/ui/progress"
import { exportToExcel } from "~/lib/excel"

interface Props {
    enrollments: Enrollment[]
    session: number
    bootcampid: string
}


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

const validateEligibility = (enrollment: Enrollment, sessionCount: number) => {
  
  let clockInCount = enrollment.user.session_attendances.filter(e => e.attendance_type == 'clock_in').length 
  let clockOutCount = enrollment.user.session_attendances.filter(e => e.attendance_type == 'clock_in').length
  let assignmentSubmittedCount = enrollment.user.session_assignment_results.length
  let preTestSubmitted = displayMaxScoreAttempt(enrollment.user.student_attempts.filter(e => e.test.type == TestType.PRE_TEST)).length
  let assignmentGradeACount = enrollment.user.session_assignment_results.filter(e => e.result == AssignmentResultType.GOOD).length
  let postTestPassed = displayMaxScoreAttempt(enrollment.user.student_attempts.filter(e => e.test.type == TestType.POST_TEST)).filter(e => e.score && e.score.score >= e.test.minimum_score).length

  if (Math.max(clockInCount, clockOutCount, assignmentGradeACount, preTestSubmitted, assignmentSubmittedCount, postTestPassed) == 0) {
    return 0
  }else if ([clockInCount, clockOutCount, assignmentGradeACount, preTestSubmitted, postTestPassed].every(e => e == sessionCount)){
    return 2
  }
  return 1
}


const BootcampReportGrid = ({enrollments, session, bootcampid}:Props) => {
    
    const [selected, setSelected] = useState<string[]>(enrollments.sort((a, b) => compare(a.user.nim ?? '', b.user.nim ?? '')).map(_ => ""))
    const [progress, setProgress] = useState(0)
    const [isEligible, _] = useState(enrollments.sort((a, b) => compare(a.user.nim ?? '', b.user.nim ?? '')).map(e => validateEligibility(e, session)))

    const onSelect = (e: Enrollment, idx:number) => {
        setSelected(selected.map((val, index) => {
            if (index == idx) {
                if (val == e.user_id) return ""
                return e.user_id
            }
            return val
        }))
        
    }

    
    const exportResult = () => {
        exportToExcel(`${bootcampid}-studentreport`, enrollments.map(e => (
            {
                nim: e.user.nim,
                name: e.user.name,
                "clock in": e?.user.session_attendances.filter(e => e.attendance_type == 'clock_in').length,
                "clock out": e?.user.session_attendances.filter(e => e.attendance_type == 'clock_out').length,
                "pre test": displayMaxScoreAttempt(e?.user.student_attempts.filter(e => e.test.type == TestType.PRE_TEST)).length,
                "post-test passed": displayMaxScoreAttempt(e?.user.student_attempts.filter(e => e.test.type == TestType.POST_TEST)).filter(e => e.score && e.score.score >= e.test.minimum_score).length,
                "assignment submitted": e?.user.session_assignment_results.length,
                "assignment grade A": e?.user.session_assignment_results.filter(e => e.result == AssignmentResultType.GOOD).length,
            }
        )))
    }

    const selectAll = () => {
        setSelected(enrollments.map((e, idx) => {
            if (isEligible[idx] != 0) return e.user_id
            return ""
        }))
    }

    const generateAll = async () => {

    const toastId = toast.loading("Generating certificate...")
    
    if (selected.filter(e => e!= '').length == 0) {
        toast.error(`You must select the user!`, {
            id: toastId
        })
        return
    }

    try {
      for (let i = 0;i < selected.length;i++){
        if (selected[i] == "") continue
        await createCertificate({
            data: {
            bootcamp_id: bootcampid,
            user_id: selected[i],
            type: isEligible[i] == 2? CertificateType.PREMIUM:CertificateType.NORMAL,
            }
        })
        setProgress(prev => prev + 100 / selected.filter(e => e != "").length);
      }
      setProgress(100)
      toast.success(`Generate certificate for selected user success!`, {
        id: toastId
      })
    } catch (error) {
      toast.error(`Generate certificate for selected user failed!`, {
        id: toastId
      })
      
    }finally{
        setTimeout(() => {
            setProgress(0)
        }, 3000);
    }
    }
    
    
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
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Button onClick={exportResult} className="bg-green-500 hover:bg-green-400">Export to Excel</Button>
                    <Button onClick={selectAll} className="bg-orange-500 hover:bg-orange-400">Select All</Button>
                    <Button onClick={generateAll}>Generate</Button>
                    {selected.filter(e => e != "").length + " Selected"}
                </div>
                {progress > 0 && <Progress value={progress} className="w-full"/>}
                <TableLayout
                    header = {<ReportDataTableHeader />}
                >
                    {enrollments.sort((a, b) => compare(a.user.nim ?? '', b.user.nim ?? '')).map(
                    (e, idx) => (
                        <StudentReportRow cur={1} idx={idx} e={e} sessionCount={session} onSelect={onSelect} isSelected={selected[idx] != ""} isEligible={isEligible[idx]}/>
                    )
                    )}
                </TableLayout>
            </div>
        }
    </>)
}

export default BootcampReportGrid