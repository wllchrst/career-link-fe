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
            <h4 className="font-bold text-black text-xl mb-3">Material</h4>
            {sessionData.map(e => <>
                <div className="flex gap-5 w-1/3 p-2 justify-between items-center text-xl text-accent underline">
                    <a href={e.link}>
                        <div className="flex gap-2">
                            <LinkIcon />
                            <p className="text-sm">{e.description}</p>
                        </div>
                    </a>
                    {
                        role == 'admin' && <div className="flex gap-2">
                            <Button><FaEdit /></Button>
                            <Button><FaTrash /></Button>
                        </div>
                    }
                </div>
            
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