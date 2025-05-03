import AccordionLayout from "~/components/layouts/accordion-layout";
import QuizCard from "~/components/quiz/quiz-card";
import type { Route } from "./+types/session-detail";
import { getBootcampSession } from "~/features/session/api/get-session";
import SessionCard from "~/components/session/session-card";
import { useState } from "react";
import { Modal, type ModalType } from "~/components/modal";
import { useRevalidator } from "react-router";
import { CreateTest } from "~/features/quiz/components/create-quiz";
import { QuizType } from "~/types/enum";


export const loader = async ({ params }: Route.LoaderArgs) => {

    const { data: session } = await getBootcampSession(params.id);
    return {session}
};


const Session = ({loaderData}:Route.ComponentProps) => {

    const {session} = loaderData
    const [quizType, setQuizType] = useState<QuizType>()
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();
    
    const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
    };

    const onCreatePretest = () => {
        setQuizType(QuizType.PRE_TEST)
        setActiveModal('create')
    }
    const onCreatePosttest = () => {
        setQuizType(QuizType.POST_TEST)
        setActiveModal('create')
    }

    // const onUpdate = (bootcamp: Bootcamp) => {
    //     setSelectedBootcamp(bootcamp);
    //     setActiveModal("update");
    // };
    
    // const onDelete = (bootcamp: Bootcamp) => {
    //     setSelectedBootcamp(bootcamp);
    //     setActiveModal("delete");
    // };

    return (
    <>
        <Modal 
            title={`Add ${quizType?.replace('_', ' ')}`}
            isOpen={activeModal === "create"}
            onClose={() => setActiveModal(null)}
          >
              <CreateTest quizType={quizType ?? QuizType.PRE_TEST} sessionId={session.id} onSuccess={onSuccess} />
        </Modal>
        <div className={'flex flex-col w-full gap-y-4'}>
            <SessionCard session={session}/>
            <h2 className={'font-semibold text-left text-4xl text-slate-700 py-6 w-full h-full'}>To Do List</h2>
            <div className={'flex flex-col gap-y-6 mb-8'}>
                <AccordionLayout text={'Pretest'}>
                    <QuizCard onCreate={onCreatePretest}/>
                </AccordionLayout>
                <AccordionLayout text={'Material'}>
                    here material
                </AccordionLayout>
                <AccordionLayout text={'Post Test'}>
                    <QuizCard onCreate={onCreatePosttest}/>
                </AccordionLayout>
                <AccordionLayout text={'Assignment'}>
                    here assignment
                </AccordionLayout>
            </div>
        </div>
    </>
    )
}

export default Session