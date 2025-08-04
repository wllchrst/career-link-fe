import { api } from "~/lib/api-client"
import type { Enrollment } from "~/types/api"

export const getEnrollmentByUser = (bootcamp_id: string): Promise<{ data: Enrollment[] }>  => {

    return api.get(`bootcamp/enrollment/user/${bootcamp_id}`)
}