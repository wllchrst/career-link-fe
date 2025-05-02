import {Link} from "react-router";
import EmptyMessage from "~/components/ui/empty-message";
import type { Session } from "~/types/api";

type Props = {
    sessions: Session[]
}

const SessionsGrid = ({sessions}:Props) => {
    return (
        <>
            <div className="flex flex-col">
                <p className={"text-primary text-3xl font-semibold ml-4 mb-8"}>Bootcamp Content</p>
                <div className="flex flex-col gap-7">
                    {sessions.length > 0 ? sessions.map(session => <>
                        <Link to={`/session/${session.id}`} type={'single'} className={"box-border flex items-center border-2 gap-x-4 bg-white p-2 rounded-md shadow-md"}>
                            <h2 className={'font-normal text-xl text-green-500 border-r-2 border-green-500 p-6 h-full flex justify-center items-center aspect-square'}>{session.session_number}</h2>
                            <h2 className={'font-normal text-xl text-green-500 p-6 h-full '}>{session.title}</h2>
                        </Link>
                
                    </>):
                    <EmptyMessage text="There is no session here. please consider to add one..." title="No sessions yet"/>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default SessionsGrid;