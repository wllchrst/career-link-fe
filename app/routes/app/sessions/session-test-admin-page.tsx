import CreateQuestion from "~/features/quiz/components/create-question";
import type { Route } from "./+types/session-test-admin-page";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { getSessionTestQuestions } from "~/features/quiz/api/get-test-question";
import { useRevalidator } from "react-router";
import { Modal, type ModalType } from "~/components/modal";
import { DeleteQuestion } from "~/features/quiz/components/delete-question";
import type { Question } from "~/types/api";


export const loader = async ({ params }: Route.LoaderArgs) => {

    const {data: questions} = await getSessionTestQuestions(params.test)
    
    return {questions: questions, id: params.test}
};



const SessionTestAdminPage = ({loaderData}:Route.ComponentProps) => {

    const {questions, id} = loaderData
    const [count, setCount] = useState(0)

    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();
    const [idx, setIdx] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState<Question>();
    
    const onSuccess = () => {
        setActiveModal(null);
        revalidator.revalidate();
        // if (activeModal == 'delete') {
        //     questions.splice(idx - 1, 1)
        // }
    };

    const onDelete = (idx:number, question?:Question|undefined) => {
        setIdx(idx)
        setSelectedQuestion(question)
        setActiveModal('delete')
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
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <Button onClick={() => setCount(count + 1)}>Add Question</Button>
            </div>
            {questions.map((e, idx) => 
                <CreateQuestion onSuccess={onSuccess} key={idx} question={e} sessionTestId={id} number={(idx+1) + ""} onDelete={onDelete}/>
            )}
            {/* {Array.from({length: count}).map((_, idx) => 
                <CreateQuestion onSuccess={onSuccess} key={idx} sessionTestId={id} number={(questions.length + idx + 1) + ""} onDelete={onDelete}/>
            )}   */}

            
        </div>
        </>
    )
}

export default SessionTestAdminPage