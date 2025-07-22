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
import { getSessionDataBySession } from "~/features/session-data/api/session_data_by_session_id";
import { getAssignmentAnswerByUserAndAssignment } from "~/features/assignment/api/answer/get-assignment-answer-by-user-and-assignment";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { createStudentAttendance } from "~/features/attendance/api/create-attendance";
import { getAttendanceByUserAndSession } from "~/features/attendance/api/get-attendance-by-user-and-session";
import { format } from "date-fns";
import { getEvaluationQuestionBySession } from "~/features/evaluation/api/get-evaluation-question-by-session";

export const loader = async ({ params }: Route.LoaderArgs) => {

    const { data: session } = await getBootcampSession(params.session);
    const { data: tests } = await getSessionTest(session.id);
    const { data: assignment } = await getAssignment(session.id).catch(() => ({data: undefined}));
    const {data: assignmentAnswer } = await getAssignmentAnswerByUserAndAssignment(assignment? assignment.id : "", 'sdf').catch(() => ({data: undefined}));
    const { data: sessionData } = await getSessionDataBySession(session.id)
    const preTest = tests.filter(e => e.type == TestType.PRE_TEST)[0]
    const postTest = tests.filter(e => e.type == TestType.POST_TEST)[0]
    
    const {data: attemptsPretest} = await getStudentAttemptByTest(preTest ? preTest.id:"", 'sdf').catch(() => ({data: []}));
    const {data: attemptsPosttest} = await getStudentAttemptByTest(postTest ? postTest.id:"", 'sdf').catch(() => ({data: []}));
    const {data: attendances} = await getAttendanceByUserAndSession(session.id, 'sdf').catch(() => ({data: []}))
    const {data: evaluationQuestions} = await getEvaluationQuestionBySession(params.session)
    
    
    return {
        session, 
        sessionData,
        preTest,
        postTest,
        assignment,
        assignmentAnswer,
        attemptsPretest,
        attemptsPosttest,
        attendances,
        evaluationQuestions
    }
};


const Session = ({loaderData}:Route.ComponentProps) => {

    const {
        session, 
        sessionData, 
        preTest, 
        postTest, 
        assignment, 
        assignmentAnswer, 
        attemptsPretest, 
        attemptsPosttest, 
        attendances,
        evaluationQuestions
    } = loaderData
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();

    const onSuccess = () => {
        setActiveModal(null);
        revalidator.revalidate();
    };

    const takeAttendance = async () => {
        const toastId = toast.loading("Submitting Attendance...");
            try {
                
                const res = await createStudentAttendance({
                    data: {
                        attendance_type: attendances.length < 1?'clock_in':'clock_out',
                        session_id: session.id,
                        user_id: 'sdf'
                    }
                })
                toast.success(res.message, { id: toastId });
                onSuccess()
            } catch (error) {
            toast.error(getErrorMessage(error), {
                id: toastId,
            });
        }
    }
    return (
    <>
        <Modal
            title={`Session Clock in/out`}
            isOpen={activeModal === "create"}
            onClose={() => setActiveModal(null)}
        >
            {attendances.length > 0 ? <>
                {attendances.sort((a,b) => new Date(a.finished_at).getTime() - new Date(b.finished_at).getTime()).map(e => <div>
                    <h4>{e.attendance_type.replace('_', ' ')} at {format(e.finished_at, "MM/dd/yyyy HH:mm:ss")}</h4>
                </div>)}          
            </>:<EmptyMessage 
                title="No Clock in/out yet" 
                text="You haven't clock in/out. please click button below to take attendance"
            />}
            <Button 
                className="w-full"
                onClick={takeAttendance}
            >
                Clock {attendances.length > 0? "Out":"In"}
            </Button>
        </Modal>
        <div className={'flex flex-col w-full gap-y-4'}>
            <SessionCard 
                session={session}
            />
            <SessionTodolist 
                attendances={attendances}
                session={session} 
                sessionData={sessionData}
                assignment={assignment}
                attendanceOnClick={() => setActiveModal('create')} 
                attemptsPosttest={attemptsPosttest}
                attemptsPretest={attemptsPretest}
                assignmentAnswer={assignmentAnswer}
                postTest={postTest}
                preTest={preTest}
                evaluationQuestions={evaluationQuestions}
            />
        </div>
    </>
    )
}

export default Session