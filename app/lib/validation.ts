import type { Session } from "~/types/api"

export const isClockInOpen = (session:Session) => (
    new Date().getTime() >= new Date(session.start_attendance_date).getTime() 
)

export const isClockInRange = (session:Session) => ( 
    new Date().getTime() <= new Date(session.start_attendance_date).getTime() + 1000 * 60 * 30
)

export const isClockOutOpen = (session:Session) =>  (
    new Date().getTime() >= new Date(session.end_date).getTime()
)