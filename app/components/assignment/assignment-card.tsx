import { useRole } from "~/role-testing-provider"
import { Button } from "../ui/button"
import { Modal, type ModalType } from "../modal"
import { useState } from "react"
import { useRevalidator } from "react-router"
import CreateAssignment from "~/features/assignment/components/create-assignment"
import type { Assignment } from "~/types/api"
import EmptyMessage from "../ui/empty-message"

interface Props {
    sessionId: string,
    assignment?: Assignment | undefined
}

const AssignmentCard = ({sessionId, assignment}:Props) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();
    
    const onSuccess = () => {
        setActiveModal(null);
        revalidator.revalidate();
    };

    const {role} = useRole()

    return (
        <>
            <Modal 
                title={`Add Assignment`}
                isOpen={activeModal === "create"}
                onClose={() => setActiveModal(null)}
            >
                <CreateAssignment onSuccess={onSuccess} sessionId={sessionId} />
            </Modal>
            {assignment? <>
                
            </>:<EmptyMessage text="There is no assignment. Please contact your instructor!" title="No Assignment Yet."/>}  
            {role == 'admin' && <>
                <div className="flex gap-5 justify-start items-center">
                    <Button
                        className={'bg-slate-500 text-white rounded-md p-2 w-40 hover:bg-slate-700 transition duration-200 ease-in-out'}
                        onClick={() => setActiveModal('create')}
                    >
                        Add New Assignment
                    </Button>
                    {assignment && <>
                        <Button
                            className={'bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out'}>
                            Update
                        </Button>
                        <Button
                            className={'bg-red-500 text-white rounded-md p-2 w-40 hover:bg-red-700 transition duration-200 ease-in-out'}>
                            Delete
                        </Button>
                    </>}
                </div>
            </>}
        </>
    )
}

export default AssignmentCard