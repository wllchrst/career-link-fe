
import AssignmentCard from "~/components/assignment/assignment-card"
import AccordionLayout from "~/components/layouts/accordion-layout"
import TestCard from "~/components/test/test-card"
import { Button } from "~/components/ui/button"
import type { Assignment, Session, SessionTest, StudentAttempt } from "~/types/api"
import { TestType } from "~/types/enum"

interface Props {
    attendanceOnClick: () => void,
    session: Session,
    preTest: SessionTest,
    postTest: SessionTest,
    assignment?: Assignment | undefined,
    attemptsPretest: StudentAttempt[],
    attemptsPosttest: StudentAttempt[],
}

const SessionTodolist = ({attendanceOnClick, session, preTest, postTest, assignment, attemptsPretest, attemptsPosttest}:Props) => {
    return (
        <>
            <h2 className={'font-semibold text-left text-4xl text-slate-700 py-6 w-full h-full'}>To Do List</h2>
            <div className={'flex flex-col gap-y-6 mb-8'}>
                <Button onClick={attendanceOnClick} className="w-1/6">Session Clock in/out</Button>
                <AccordionLayout text={'Pretest'}>
                    <TestCard testType={TestType.PRE_TEST} sessionId={session.id} test={preTest} attempts={attemptsPretest}/>
                </AccordionLayout>
                <AccordionLayout text={'Material'}>
                    here material
                </AccordionLayout>
                <AccordionLayout text={'Post Test'}>
                    <TestCard testType={TestType.POST_TEST} sessionId={session.id} test={postTest} attempts={attemptsPosttest}/>
                </AccordionLayout>
                <AccordionLayout text={'Assignment'}>
                    <AssignmentCard sessionId={session.id} assignment={assignment} />
                </AccordionLayout>
                <AccordionLayout text={'Evaluation'}>
                    <AssignmentCard sessionId={session.id} />
                </AccordionLayout>
            </div>
        </>
    )
}

export default SessionTodolist