import { Copy, Edit, Trash } from "lucide-react";
import {Link, useRevalidator} from "react-router";
import { Button } from "~/components/ui/button";
import EmptyMessage from "~/components/ui/empty-message";
import type { Session } from "~/types/api";
import { createSession } from "../api/create-session";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { useRole } from "~/provider/role-testing-provider";

type Props = {
    sessions: Session[]
    bootcampId: string
    onUpdateSession: (session:Session) => void
    onDeleteSession: (session:Session) => void
}

const SessionsGrid = ({sessions, bootcampId, onUpdateSession, onDeleteSession}:Props) => {

    const revalidator = useRevalidator()

    const copySession = async (session:Session) => {
        const toastId = toast.loading("Copying session...");
        try {
            await createSession({data: {
                ...session, 
                session_number: `${sessions.length + 1}`, 
                start_attendance_date: new Date(session.start_attendance_date), 
                end_date: new Date(session.end_date),
                bootcamp_id: bootcampId
            }})   
            toast.success("Session copied", { id: toastId });
            revalidator.revalidate()
        } catch (error) {
            toast.error(getErrorMessage(error), {
            id: toastId,
            });
        }
    }

    const {role} = useRole()

    return (
        <>
            <div className="flex flex-col">
                <p className={"text-primary text-3xl font-semibold ml-4 mb-8"}>Bootcamp Content</p>
                <div className="flex flex-col gap-7">
                    {sessions.length > 0 ? sessions.sort((a,b) => a.session_number - b.session_number).map(session => <div className="box-border flex items-center border-2 gap-x-4 bg-white py-2 px-4 rounded-md shadow-md justify-between">
                        <Link to={`session/${session.id}`} type={'single'} className={"flex items-center"}>
                            <h2 className={'font-normal text-xl text-green-500 border-r-2 border-green-500 py-6 h-full flex justify-center items-center aspect-square'}>{session.session_number}</h2>
                            <h2 className={'font-normal text-xl text-green-500 p-6 h-full '}>{session.title}</h2>
                        </Link>
                        {role != 'user' && <div className="flex gap-4">
                            <Button variant={'ghost'} className="hover:bg-slate-200" onClick={() => onUpdateSession(session)}>
                                <Edit />
                            </Button>
                            <Button variant={'ghost'} className="hover:bg-slate-200" onClick={() => copySession(session)}>
                                <Copy />
                            </Button>
                            <Button variant={'ghost'} className="hover:bg-slate-200" onClick={() => onDeleteSession(session)}>
                                <Trash />
                            </Button>
                        </div>}
                    </div>):
                    <EmptyMessage text="There is no session here. please consider to add one..." title="No sessions yet"/>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default SessionsGrid;