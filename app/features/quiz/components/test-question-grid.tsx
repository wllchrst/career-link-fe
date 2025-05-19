import { Button } from "~/components/ui/button"
import CreateQuestion from "./create-question"
import type { Question } from "~/types/api"
import { exportToExcel, importExcel } from "~/lib/excel"
import { useState, type ChangeEvent } from "react"
import { Modal, type ModalType } from "~/components/modal"
import { DeleteQuestion } from "./delete-question"
import EmptyMessage from "~/components/ui/empty-message"
import { deleteQuestion } from "../api/question/delete-test-question"
import toast from "react-hot-toast"
import { getErrorMessage } from "~/lib/error"
import { DeleteAllQuestion } from "./delete-all-question"

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
    const [importedTest, setTest] = useState<Template[]>()

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

    const importTest = (e:ChangeEvent<HTMLInputElement>) => {
        Promise.all(questions.map(async (e) => await deleteQuestion(e.id)))

        const reader = new FileReader()

        reader.onload = (event) => importExcel<Template>(event, (res) => setTest(res))
        reader.readAsArrayBuffer(e.target.files![0])
    }

    return (
        <>
            <Modal
                title="Delete All Question"
                onClose={() => onClose()}
                isOpen={activeModal == 'delete' && idx == -1}
            >
                <DeleteAllQuestion questions={questions} onSuccess={onSuccess} />
            </Modal>
            <Modal 
                title={`Add Question`}
                isOpen={activeModal === "create"}
                onClose={() => onClose()}
                >
                    <CreateQuestion onSuccess={onSuccess} sessionTestId={id} number={(questions.length + 1)} onDelete={onDelete}/>
            </Modal>
            <Modal 
                title={`Delete Question`}
                isOpen={activeModal === "delete" && idx != -1}
                onClose={() => onClose()}
                >
                <DeleteQuestion number={idx} onSuccess={onSuccess} question={selectedQuestion} onClose={() => onClose()} />
            </Modal>
            <div className="flex justify-between items-start gap-10">
                <div className="w-3/5">
                    <div className="flex flex-col gap-5">
                    {questions.length > 0 ?
                        questions.sort((a,b) => a.number - b.number).map((e) => 
                        <CreateQuestion onSuccess={onSuccess} key={e.id} question={e} sessionTestId={id} number={(e.number)} onDelete={onDelete}/>):
                        <EmptyMessage title="No Questions Yet" text="There is no question in this test. please create one or import using our test template."/>
                    }
                    </div>
                </div>
                <div className="flex grid grid-cols-2 gap-5 w-2/5 bg-white rounded-lg shadow-md p-5">
                    <Button onClick={onCreate} className="">
                        Add Question
                    </Button>
                    <Button variant={'destructive'} onClick={() => {onDelete(-1, questions[0])}}>
                        Remove all Question
                    </Button>
                    <Button onClick={() => exportToExcel('template', template)} className="bg-purple-500 hover:bg-purple-400">
                        Download Test Template
                    </Button>
                    <label htmlFor="file" className="bg-green-600 hover:bg-green-500 px-2 rounded-md text-white flex items-center justify-center">
                        Import Test
                    </label>
                    <input type="file" name="" id="file" hidden onChange={e => importTest(e)}/>
                </div>
            </div>
        </>
    )
}

export default TestQuestionGrid