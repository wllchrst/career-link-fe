import { useRole } from "~/role-testing-provider"
import { Button } from "../ui/button"
import { Modal, type ModalType } from "../modal"
import { useState } from "react"
import { useRevalidator } from "react-router"
import CreateAssignment from "~/features/assignment/components/create-assignment"
import type { Assignment } from "~/types/api"
import EmptyMessage from "../ui/empty-message"
import { Download, File } from "lucide-react"

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
                <p>The assignment can be downloaded from the button below</p>
                <a href={`${import.meta.env.VITE_STORAGE_URL}/${assignment.question_file_path}`} download target="_blank">
                    <Button variant={'outline'} className="w-1/3 h-10">
                        <div className="flex gap-2 items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <File />
                                <p className="font-regular">Question</p>
                            </div>
                            <Download />
                        </div>
                    </Button>    
                </a>
                {role == 'admin' ? <>
                    <p>The assignment's answer can be downloaded from the button below</p>
                    <a href={`${import.meta.env.VITE_STORAGE_URL}/${assignment.answer_file_path}`} download target="_blank">
                        <Button variant={'outline'} className="w-1/3 h-10">
                            <div className="flex gap-2 items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <File />
                                    <p className="font-regular">Answer</p>
                                </div>
                                <Download />
                            </div>
                        </Button>    
                    </a>
                </>:<>
                    <p className=" mt-10 text-red-600">{`Max file size 100MB\nSupports: .docx, .pdf`}</p>
                    <div className="flex items-center gap-5 w-full">
                        <Button className="w-1/5">Upload Answer</Button>
                        <a href={`/`} download target="_blank" className="w-full">
                            <Button variant={'outline'} className="w-full h-10">
                                <div className="flex gap-2 items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <File />
                                        <p className="font-regular">Document Name</p>
                                    </div>
                                    <Download />
                                </div>
                            </Button>    
                        </a>
                    </div>
                </>
                }

            </>:
            <EmptyMessage text="There is no assignment. Please contact your instructor!" title="No Assignment Yet."/>
            }  
            {role == 'admin' && <>
                <div className="flex gap-5 justify-start items-center">
                    
                    {assignment ? <>
                        <Button
                            className={'bg-purple-500 text-white rounded-md p-2 w-40 hover:bg-purple-700 transition duration-200 ease-in-out'}>
                            View Details
                        </Button>
                        <Button
                            className={'bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out'}>
                            Update
                        </Button>
                        <Button
                            className={'bg-red-500 text-white rounded-md p-2 w-40 hover:bg-red-700 transition duration-200 ease-in-out'}>
                            Delete
                        </Button>
                    </>:
                    <Button
                        className={'bg-slate-500 text-white rounded-md p-2 w-40 hover:bg-slate-700 transition duration-200 ease-in-out'}
                        onClick={() => setActiveModal('create')}
                    >
                        Add New Assignment
                    </Button>
                    }
                </div>
            </>}
        </>
    )
}

export default AssignmentCard