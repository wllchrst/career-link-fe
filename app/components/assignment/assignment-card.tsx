import { useRole } from "~/role-testing-provider"
import { Button } from "../ui/button"
import { Modal, type ModalType } from "../modal"
import { useState } from "react"
import { useRevalidator } from "react-router"
import CreateAssignment from "~/features/assignment/components/create-assignment"

interface Props {
    sessionId: string
}

const AssignmentCard = ({sessionId}:Props) => {
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
            {role == 'admin' && <>
                <div className="flex gap-5 justify-start items-center">
                    <Button
                        className={'bg-slate-500 text-white rounded-md p-2 w-40 hover:bg-slate-700 transition duration-200 ease-in-out'}
                        onClick={() => setActiveModal('create')}
                    >
                        Add New Assignment
                    </Button>
                    <Button
                        className={'bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out'}>
                        Update
                    </Button>
                    <Button
                        className={'bg-red-500 text-white rounded-md p-2 w-40 hover:bg-red-700 transition duration-200 ease-in-out'}>
                        Delete
                    </Button>
                </div>
            </>}
        </>
    )
}

export default AssignmentCard