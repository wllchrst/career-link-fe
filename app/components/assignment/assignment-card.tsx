import { useRole } from "~/provider/role-testing-provider"
import { Button } from "../ui/button"
import { Modal, type ModalType } from "../modal"
import { useState, type ChangeEvent } from "react"
import { Link, useRevalidator } from "react-router"
import CreateAssignment from "~/features/assignment/components/create-assignment"
import type { Assignment, AssignmentAnswer, AssignmentResult, Session } from "~/types/api"
import EmptyMessage from "../ui/empty-message"
import { AlertCircle, Download, File } from "lucide-react"
import { createAssignmentAnswer } from "~/features/assignment/api/answer/create-assignment-answer"
import toast from "react-hot-toast"
import { getErrorMessage } from "~/lib/error"
import { updateAssignmentAnswer } from "~/features/assignment/api/answer/update-assignment-answer"

interface Props {
    session: Session,
    assignment?: Assignment | undefined,
    assignmentAnswer?: AssignmentAnswer | undefined,
    result?: AssignmentResult | undefined, 
}

const AssignmentCard = ({session, assignment, assignmentAnswer, result}:Props) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();
    
    const onSuccess = () => {
        setActiveModal(null);
        revalidator.revalidate();
    };

    const onChange = async (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            const toastId = toast.loading("Submitting Answer...");
            try {
                
                const res = assignmentAnswer? await updateAssignmentAnswer({
                    data:{
                        answer_file: file,
                        user_id: 'sdf',
                        assignment_id: assignment!.id,
                        answer_file_path: file.name
                    },
                    id: assignmentAnswer.id
                }):await createAssignmentAnswer({
                    data:{
                        answer_file: file,
                        user_id: 'sdf',
                        assignment_id: assignment!.id,
                        answer_file_path: file.name
                    }
                })
                setFileName(res.data.id)
                toast.success(res.message, { id: toastId });
                onSuccess()
            } catch (error) {
            toast.error(getErrorMessage(error), {
                id: toastId,
            });
            }
        }
    }

    const {role} = useRole()
    console.log(assignmentAnswer)

    return (
        <>
            <Modal 
                title={`Add Assignment`}
                isOpen={activeModal === "create"}
                onClose={() => setActiveModal(null)}
            >
                <CreateAssignment onSuccess={onSuccess} sessionId={session.id} />
            </Modal>
            {assignment? <>
                <p>The assignment can be downloaded from the button below</p>
                <a href={`${import.meta.env.VITE_STORAGE_URL}/${assignment.question_file_path}`} download target="_blank" className="w-1/3">
                    <Button variant={'outline'} className="w-full h-10">
                        <div className="flex gap-2 items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <File />
                                <p className="font-regular">Question</p>
                            </div>
                            <Download />
                        </div>
                    </Button>    
                </a>
                {(role == 'admin' || (assignment.is_shared && new Date().getTime() > new Date(session.end_date).getTime())) ? <>
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
                    <p className=" mt-5 text-red-600">{`*Max file size 100MB\nSupports: .docx, .pdf`}</p>
                    <div className="flex gap-5 items-center">
                        <label htmlFor="file" className="w-1/5 bg-accent py-1 px-2 rounded-lg text-white h-10 flex items-center justify-center">
                            <p>Upload Answer</p>
                        </label>
                        <input type="file" name="" id="file" hidden onChange={e => onChange(e)}/>
                        <a href={
                            assignmentAnswer ? `${import.meta.env.VITE_STORAGE_URL}/${assignmentAnswer.answer_file_path}`:
                            previewUrl!
                        } download target="_blank" className="w-full">
                            <Button variant={'outline'} className="w-full h-10">
                                <div className="flex gap-2 items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <File />
                                        <p className="font-regular">{assignmentAnswer? assignmentAnswer.answer_file_path.replace('uploads/','') :'Document Name'}</p>
                                    </div>
                                    <Download />
                                </div>
                            </Button>    
                        </a>
                    </div>
                    
                </>
                }
                <div className="bg-green-200 border-green-700 border-1 p-3 rounded-md flex items-center gap-3 w-2/5">
                    <AlertCircle className="text-green-700" />
                    <p className="text-md font-bold text-green-700">
                        Your grade: {result?.result}
                    </p> 
                </div>
            </>:
            <EmptyMessage text="There is no assignment. Please contact your instructor!" title="No Assignment Yet."/>
            }  
            {role == 'admin' && <>
                <div className="flex gap-5 justify-start items-center">
                    
                    {assignment ? <>
                        <Link to={`assignment/${assignment.id}/answer`}>
                            <Button
                                className={'bg-purple-500 text-white rounded-md p-2 w-40 hover:bg-purple-700 transition duration-200 ease-in-out'}>
                                View Submissions
                            </Button>
                        </Link>
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