import AccordionLayout from "~/components/layouts/accordion-layout";
import TestCard from "~/components/test/test-card";
import type { Route } from "./+types/session-detail";
import { getBootcampSession } from "~/features/session/api/get-session";
import SessionCard from "~/components/session/session-card";
import AssignmentCard from "~/components/assignment/assignment-card";
import { TestType } from "~/types/enum";
import { getSessionTest } from "~/features/quiz/api/get-test";
import { getStudentAttemptByTest } from "~/features/quiz/api/attempt/get-student-attempt-by-test";
import type { StudentAttempt } from "~/types/api";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useRevalidator } from "react-router";
import { Modal, type ModalType } from "~/components/modal";
import EmptyMessage from "~/components/ui/empty-message";

export const loader = async ({ params }: Route.LoaderArgs) => {

    const { data: session } = await getBootcampSession(params.session);
    const { data: tests } = await getSessionTest(session.id);
    const preTest = tests.filter(e => e.type == TestType.PRE_TEST)[0]
    const postTest = tests.filter(e => e.type == TestType.POST_TEST)[0]
    let attemptsPretest:StudentAttempt[] = []    
    let attemptsPosttest:StudentAttempt[] = []
    
    // try{
    //     attemptsPretest = (await getStudentAttemptByTest(preTest.id, 'sdf')).data;
    //     attemptsPosttest = (await getStudentAttemptByTest(postTest.id, 'sdf')).data;
    // }catch(e){
    //     console.log(e)
    // }
    
    return {
        session, 
        preTest: preTest,
        postTest: postTest,
        attemptsPretest: [],
        attemptsPosttest: []
    }
};


const Session = ({loaderData}:Route.ComponentProps) => {

    const {session, preTest, postTest, attemptsPretest, attemptsPosttest} = loaderData
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
            <EmptyMessage title="No Clock in/out yet" text="You haven't clock in/out. please click button below to take attendance"/>
            <Button onClick={onSuccess} className="w-full">Take Attendance</Button>
        </Modal>
        <div className={'flex flex-col w-full gap-y-4'}>
            <SessionCard session={session}/>
            <h2 className={'font-semibold text-left text-4xl text-slate-700 py-6 w-full h-full'}>To Do List</h2>
            <div className={'flex flex-col gap-y-6 mb-8'}>
                <Button onClick={() => setActiveModal('create')} className="w-1/6">Session Clock in/out</Button>
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
                    <AssignmentCard sessionId={session.id} />
                </AccordionLayout>
                <AccordionLayout text={'Evaluation'}>
                    <AssignmentCard sessionId={session.id} />
                </AccordionLayout>
            </div>
        </div>
    </>
    )
}

export default Session