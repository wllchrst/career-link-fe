import type { Session, SessionData } from "~/types/api"
import { Modal, type ModalType } from "../modal"
import CreateSessionData from "~/features/session-data/component/create-session-data"
import { useState } from "react"
import { Link, useRevalidator } from "react-router"
import { useRole } from "~/role-testing-provider"
import { Button } from "../ui/button"
import TooltipLayout from "../layouts/tooltip-layout"
import { LinkIcon } from "lucide-react"
import { FaEdit, FaTrash } from "react-icons/fa"

interface Props {
    sessionData: SessionData[]
    session: Session
}

const SessionDataCard = ({sessionData, session}:Props) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const revalidator = useRevalidator();
    
    const onSuccess = () => {
        setActiveModal(null);
        revalidator.revalidate();
    };
    const {role} = useRole()

    return (<>
        <Modal 
            title={`Add Session Data`}
            isOpen={activeModal === "create"}
            onClose={() => setActiveModal(null)}
        >
            <CreateSessionData onSuccess={onSuccess} session={session} />
        </Modal>
        <div>
            {sessionData.map(e => <>
            <a href={"http://" + e.link} className="w-1/4" target="_blank">
                <div className="flex gap-5 w-1/3 border p-2 items-center text-xl text-accent underline">
                    <LinkIcon />
                    <p>{e.description}</p>
                    {
                        role == 'admin' && <>
                            <Button><FaEdit /></Button>
                            <Button><FaTrash /></Button>
                        </>
                    }
                </div>
            </a>
            
            </>)}
        </div>
        {role == 'admin' && <>
            <div className="flex gap-5 justify-start items-center">
                <Button
                    className={'bg-slate-500 text-white rounded-md p-2 w-40 hover:bg-slate-700 transition duration-200 ease-in-out'}
                    onClick={() => setActiveModal('create')}
                >
                    Add New Material
                </Button>
            </div>
        </>}
    </>)
}

export default SessionDataCard