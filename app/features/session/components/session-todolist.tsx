
import { Link } from "react-router"
import AssignmentCard from "~/components/assignment/assignment-card"
import AccordionLayout from "~/components/layouts/accordion-layout"
import SessionDataCard from "~/components/session/session-data-card"
import TestCard from "~/components/test/test-card"
import { Button } from "~/components/ui/button"
import { isClockInOpen, isClockInRange, isClockOutOpen } from "~/lib/validation"
import { useRole } from "~/provider/role-testing-provider"
import type { Assignment, AssignmentAnswer, Attendance, Session, SessionData, SessionTest, StudentAttempt, StudentScore } from "~/types/api"
import { TestType } from "~/types/enum"

interface Props {
    attendanceOnClick: () => void,
    session: Session,
    attendances: Attendance[],
    sessionData: SessionData[],
    preTest: SessionTest,
    postTest: SessionTest,
    assignment?: Assignment | undefined,
    assignmentAnswer?:AssignmentAnswer | undefined,
    attemptsPretest: StudentScore[],
    attemptsPosttest: StudentScore[],
}

const SessionTodolist = ({
    attendanceOnClick, 
    attendances, 
    session, 
    sessionData, 
    preTest, 
    postTest, 
    assignment, 
    assignmentAnswer, 
    attemptsPretest, 
    attemptsPosttest
}:Props) => {
    const {role} = useRole()
    return (
        <>
            <h2 className={'font-semibold text-left text-4xl text-slate-700 py-6 w-full h-full'}>To Do List</h2>
            <div className={'flex flex-col gap-y-6 mb-8'}>
                {role == 'user' ?  
                    ((isClockInOpen(session) && isClockInRange(session)) || isClockOutOpen(session)) && <Button onClick={attendanceOnClick} className="w-1/6">Session Clock in/out</Button>:
                    <Link to={`attendance`}>
                        <Button className="w-1/6">View Attendances</Button> 
                    </Link>
                }
                <AccordionLayout text={'Pretest'}>
                    <TestCard testType={TestType.PRE_TEST} sessionId={session.id} test={preTest} attempts={attemptsPretest}/>
                </AccordionLayout>
                <AccordionLayout text={'Material'} isLocked={role == 'user' && attemptsPretest.length < 1}>
                    <SessionDataCard sessionData={sessionData} session={session}/>
                </AccordionLayout>
                <AccordionLayout text={'Post Test'} isLocked={role == 'user' && (attemptsPretest.length < 1 || attendances.length < 1)}>
                    <TestCard testType={TestType.POST_TEST} sessionId={session.id} test={postTest} attempts={attemptsPosttest}/>
                </AccordionLayout>
                <AccordionLayout text={'Assignment'}  isLocked={role == 'user' && attemptsPosttest.length < 1}>
                    <AssignmentCard session={session} assignment={assignment} assignmentAnswer={assignmentAnswer} />
                </AccordionLayout>
                <AccordionLayout text={'Evaluation'} isLocked={role == 'user' && assignmentAnswer == undefined}>
                    <AssignmentCard session={session} />
                </AccordionLayout>
            </div>
        </>
    )
}

export default SessionTodolist