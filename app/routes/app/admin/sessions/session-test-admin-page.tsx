import type { Route } from "./+types/session-test-admin-page";
import { useState } from "react";
import { getSessionTestQuestions } from "~/features/quiz/api/question/get-test-question";
import { Link, useRevalidator } from "react-router";
import { type ModalType } from "~/components/modal";
import { FaArrowLeft } from "react-icons/fa";
import TestQuestionGrid from "~/features/quiz/components/test-question-grid";


export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data:questions} = await getSessionTestQuestions(params.test)
    
    return {questions, id: params.test, session: params.session, bootcamp: params.bootcamp}
};

const SessionTestAdminPage = ({loaderData}:Route.ComponentProps) => {

    const {questions, id, session, bootcamp} = loaderData
    
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();
    const onSuccess = () => {
        revalidator.revalidate().then(() => setActiveModal(null));
    };
    
    return (
        <div className="flex flex-col w-full gap-5">
            <div className={'w-full flex items-center'}>
                <Link to={`/bootcamps/${bootcamp}/session/${session}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Manage Test</h2>
            </div>
            <TestQuestionGrid 
                activeModal={activeModal} 
                onClose={() => setActiveModal(null)} 
                id={id}
                questions={questions} 
                onSuccess={onSuccess} 
                onConfirmDelete={() => setActiveModal('delete')} 
                onCreate={() => setActiveModal('create')}
            />
        </div>
    )
}

export default SessionTestAdminPage