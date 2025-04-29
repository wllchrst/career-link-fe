import AccordionLayout from "~/components/layouts/accordion-layout";
import QuizCard from "~/components/quiz/quiz-card";
import type { Route } from "./+types/session-detail";
import { getBootcampSession } from "~/features/session/api/get-session";
import SessionCard from "~/components/session/session-card";


export const loader = async ({ params }: Route.LoaderArgs) => {

    const { data: session } = await getBootcampSession(params.id);
    return {session}
};


const Session = ({loaderData}:Route.ComponentProps) => {

    const {session} = loaderData

    return <div className={'flex flex-col w-full gap-y-4'}>
        <SessionCard session={session}/>
        <h2 className={'font-semibold text-left text-4xl text-slate-700 py-6 w-full h-full'}>To Do List</h2>

        <div className={'flex flex-col gap-y-6 mb-8'}>
            <AccordionLayout text={'Pretest'} isLocked>
                <QuizCard />
            </AccordionLayout>
            <AccordionLayout text={'Material'} isLocked={true}>
                here material
            </AccordionLayout>
            <AccordionLayout text={'Post Test'} isLocked={true}>
                <QuizCard />
            </AccordionLayout>
            <AccordionLayout text={'Assignment'} isLocked={true}>
                here assignment
            </AccordionLayout>
        </div>
    </div>
}

export default Session