import { api } from "~/lib/api-client"
import type { Enrollment } from "~/types/api"

export const createEnrollment = ( email:string, bootcamp_id: string): Promise<{ data: Enrollment[] }>  => {

    return api.post(`bootcamp/enrollment`, {
        email: email, 
        bootcamp_id: bootcamp_id
    })
}