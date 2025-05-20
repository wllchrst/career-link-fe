import AccordionLayout from "~/components/layouts/accordion-layout";
import TestCard from "~/components/test/test-card";
import type { Route } from "./+types/session-detail";
import { getBootcampSession } from "~/features/session/api/get-session";
import SessionCard from "~/components/session/session-card";
import AssignmentCard from "~/components/assignment/assignment-card";
import { TestType } from "~/types/enum";
import { getSessionTest } from "~/features/quiz/api/get-test-by-session";
import { getStudentAttemptByTest } from "~/features/quiz/api/attempt/get-student-attempt-by-test";
import type { StudentAttempt } from "~/types/api";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useRevalidator } from "react-router";
import { Modal, type ModalType } from "~/components/modal";
import EmptyMessage from "~/components/ui/empty-message";
import SessionTodolist from "~/features/session/components/session-todolist";
import { getAssignment } from "~/features/assignment/api/get-assignment";

export const loader = async ({ params }: Route.LoaderArgs) => {

    const { data: session } = await getBootcampSession(params.session);
    const { data: tests } = await getSessionTest(session.id);
    const { data: assignment } = await getAssignment(session.id).catch(() => ({data: undefined}));
    // const { data: assignmentAnswer } = await 
    const preTest = tests.filter(e => e.type == TestType.PRE_TEST)[0]
    const postTest = tests.filter(e => e.type == TestType.POST_TEST)[0]
    
    const {data: attemptsPretest} = await getStudentAttemptByTest(preTest.id, 'sdf').catch(() => ({data: []}));
    const {data: attemptsPosttest} = await getStudentAttemptByTest(postTest.id, 'sdf').catch(() => ({data: []}));
    
    return {
        session, 
        preTest,
        postTest,
        assignment,
        attemptsPretest,
        attemptsPosttest
    }
};


const Session = ({loaderData}:Route.ComponentProps) => {

    const {session, preTest, postTest, assignment, attemptsPretest, attemptsPosttest} = loaderData
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();

    const onSuccess = () => {
        setActiveModal(null);
        revalidator.revalidate();
    };

    return (
    <>
        <Modal
            title={`Session Clock in/out`}
            isOpen={activeModal === "create"}
            onClose={() => setActiveModal(null)}
        >
            <EmptyMessage 
                title="No Clock in/out yet" 
                text="You haven't clock in/out. please click button below to take attendance"
            />
            <Button 
                onClick={onSuccess} 
                className="w-full"
            >
                Take Attendance
            </Button>
        </Modal>
        <div className={'flex flex-col w-full gap-y-4'}>
            <SessionCard 
                session={session}
            />
            <SessionTodolist 
                session={session} 
                assignment={assignment}
                attendanceOnClick={() => setActiveModal('create')} 
                attemptsPosttest={attemptsPosttest}
                attemptsPretest={attemptsPretest}
                postTest={postTest}
                preTest={preTest}
            />
        </div>
    </>
    )
}

export default Session