import { api } from "~/lib/api-client"
import type { Enrollment } from "~/types/api"

export const getBootcampReportByBootcampId = (bootcamp_id: string): Promise<{ data: Enrollment[] }>  => {
    return api.get(`bootcamp/enrollment_detail/bootcamp/${bootcamp_id}`)
}