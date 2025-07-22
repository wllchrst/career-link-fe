import { api } from "~/lib/api-client"
import type { Enrollment } from "~/types/api"

export const getBootcampReportByBootcampId = (bootcamp_id: string): Promise<{ data: Enrollment[] }>  => {
    return api.get(`bootcamp/enrollment_with_user_session_assignment_result_session_attendance_session_test_score/bootcamp/${bootcamp_id}`)
}