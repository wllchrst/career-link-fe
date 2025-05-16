import { Button } from "~/components/ui/button"
import CreateQuestion from "./create-question"
import type { Question } from "~/types/api"
import { exportToExcel } from "~/lib/excel"
import { useRevalidator } from "react-router"
import { useState } from "react"
import { Modal, type ModalType } from "~/components/modal"
import { DeleteQuestion } from "./delete-question"

interface Template {
    number: number,
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    answer: 'A' | 'B' | 'C' | 'D' | '',
}

interface Props {
    questions:Question[],
    id: string,
    activeModal: ModalType,
    onCreate: () => void,
    onConfirmDelete: () => void,
    onClose: () => void,
    onSuccess: () => void,
}

const TestQuestionGrid = ({questions, id, activeModal, onCreate, onConfirmDelete, onClose, onSuccess}:Props) => {

    const template: Template[] = [{
        number: 1,
        question: 'This is an example question',
        A: 'Answer a',
        B: 'Answer b',
        C: 'Answer c',
        D: 'Answer d',
        answer: 'D'
    }]
    const [idx, setIdx] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState<Question>();
    

    const onDelete = (idx:number, question?:Question|undefined) => {
        setIdx(idx)
        setSelectedQuestion(question)
        if (question)
            onConfirmDelete()
        else
            onClose()
    }

    return (
        <>
            <Modal 
                title={`Add Question`}
                isOpen={activeModal === "create"}
                onClose={() => onClose()}
                >
                    <CreateQuestion onSuccess={onSuccess} sessionTestId={id} number={(questions.length + 1)} onDelete={onDelete}/>
            </Modal>
            <Modal 
                title={`Delete Question`}
                isOpen={activeModal === "delete"}
                onClose={() => onClose()}
                >
                <DeleteQuestion number={idx} onSuccess={onSuccess} question={selectedQuestion} onClose={() => onClose()} />
            </Modal>
            <div className="flex justify-between items-start gap-10">
                <div className="w-3/5">
                    <div className="flex flex-col gap-5">
                    {
                        questions.sort((a,b) => a.number - b.number).map((e) => 
                        <CreateQuestion onSuccess={onSuccess} key={e.id} question={e} sessionTestId={id} number={(e.number)} onDelete={onDelete}/>)
                    }
                    </div>
                </div>
                <div className="flex grid grid-cols-2 gap-5 w-2/5 bg-white rounded-lg shadow-md p-5">
                    <Button onClick={onCreate} className="">Add Question</Button>
                    <Button onClick={onCreate} className="bg-orange-500 hover:bg-orange-400">View Result</Button>
                    <Button onClick={() => exportToExcel('template', template)} className="bg-purple-500 hover:bg-purple-400">Download Test Template</Button>
                    <Button onClick={onCreate} className="bg-green-500 hover:bg-green-400">Import Test</Button>
                </div>
            </div>
        </>
    )
}

export default TestQuestionGrid