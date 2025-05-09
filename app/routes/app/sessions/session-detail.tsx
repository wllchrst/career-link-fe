import AccordionLayout from "~/components/layouts/accordion-layout";
import TestCard from "~/components/test/test-card";
import type { Route } from "./+types/session-detail";
import { getBootcampSession } from "~/features/session/api/get-session";
import SessionCard from "~/components/session/session-card";
import AssignmentCard from "~/components/assignment/assignment-card";
import { TestType } from "~/types/enum";
import { getSessionTest } from "~/features/quiz/api/get-test";
import { getStudentAttemptByTest } from "~/features/quiz/api/attempt/get-student-attempt-by-test";

export const loader = async ({ params }: Route.LoaderArgs) => {

    const { data: session } = await getBootcampSession(params.session);
    const { data: tests } = await getSessionTest(session.id);
    const preTest = tests.filter(e => e.type == TestType.PRE_TEST)[0]
    // let preTest = 
    // try{
    // }catch(e){
        
    // }
    const postTest = tests.filter(e => e.type == TestType.POST_TEST)[0]

    
    // const {data: attemptsPretest} = await getStudentAttemptByTest(preTest.id, 'sdf') ?? [];
    // const {data: attemptsPosttest} = await getStudentAttemptByTest(postTest.id, 'sdf') ?? [];
    return {
        session, 
        preTest: preTest,
        postTest: postTest,
        attemptsPretest: [],
        attemptsPosttest: []
    }
};


const Session = ({loaderData}:Route.ComponentProps) => {

    const {session, preTest, postTest} = loaderData

    return (
    <>
        
        <div className={'flex flex-col w-full gap-y-4'}>
            <SessionCard session={session}/>
            <h2 className={'font-semibold text-left text-4xl text-slate-700 py-6 w-full h-full'}>To Do List</h2>
            <div className={'flex flex-col gap-y-6 mb-8'}>
                <AccordionLayout text={'Pretest'}>
                    <TestCard testType={TestType.PRE_TEST} sessionId={session.id} test={preTest}/>
                </AccordionLayout>
                <AccordionLayout text={'Material'}>
                    here material
                </AccordionLayout>
                <AccordionLayout text={'Post Test'}>
                    <TestCard testType={TestType.POST_TEST} sessionId={session.id} test={postTest}/>
                </AccordionLayout>
                <AccordionLayout text={'Assignment'}>
                    <AssignmentCard sessionId={session.id} />
                </AccordionLayout>
            </div>
        </div>
    </>
    )
}

export default Session