import CreateQuestion from "~/features/quiz/components/create-question";
import type { Route } from "./+types/session-test-admin-page";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { getSessionTestQuestions } from "~/features/quiz/api/question/get-test-question";
import { useRevalidator } from "react-router";
import { Modal, type ModalType } from "~/components/modal";
import { DeleteQuestion } from "~/features/quiz/components/delete-question";
import type { Question } from "~/types/api";


export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data:questions} = await getSessionTestQuestions(params.test)
    
    return {questions, id: params.test}
};



const SessionTestAdminPage = ({loaderData}:Route.ComponentProps) => {

    const {questions, id} = loaderData

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();
    const [idx, setIdx] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState<Question>();
    
    const onSuccess = () => {
        revalidator.revalidate().then(() => setActiveModal(null));
    };

    const onDelete = (idx:number, question?:Question|undefined) => {
        setIdx(idx)
        setSelectedQuestion(question)
        if (question)
            setActiveModal('delete')
        else
            setActiveModal(null)
    }
    console.log(questions)
    
    return (
        <>
        <Modal 
            title={`Delete Question`}
            isOpen={activeModal === "delete"}
            onClose={() => setActiveModal(null)}
            >
                <DeleteQuestion number={idx} onSuccess={onSuccess} question={selectedQuestion} onClose={() => setActiveModal(null)} />
        </Modal>
        <div className="flex flex-col gap-5 w-3/5">
            <div className="flex gap-5">
                <Button onClick={() => setActiveModal('create')}>Add Question</Button>
            </div>
            {
                questions.sort((a,b) => a.number - b.number).map((e) => 
                <CreateQuestion onSuccess={onSuccess} key={e.id} question={e} sessionTestId={id} number={(e.number)} onDelete={onDelete}/>)
            }
            {
            activeModal == 'create' && 
                <CreateQuestion onSuccess={onSuccess} sessionTestId={id} number={(questions.length + 1)} onDelete={onDelete}/>
            }

        </div>
        </>
    )
}

export default SessionTestAdminPage