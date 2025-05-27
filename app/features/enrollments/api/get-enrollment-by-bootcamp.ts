import { api } from "~/lib/api-client"
import type { Enrollment } from "~/types/api"

export const getEnrollmentByBootcamp = (bootcamp_id: string): Promise<{ data: Enrollment[] }>  => {

    return api.get(`bootcamp/enrollment/bootcamp/${bootcamp_id}`)
}