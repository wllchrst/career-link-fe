import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router"
import type { Session } from "~/types/api"

type Props = {
    session: Session
}

const SessionCard = ({session}:Props) => {

    return (
        <>
            <div className={'w-full flex items-center'}>
                    <Link to={"/"}>
                        <button
                            className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                            <FaArrowLeft/>
                        </button>
                    </Link>
                    <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Session {session.session_number}</h2>
                </div>
                <div className={"bg-white w-full h-50 shadow-md h-auto rounded-lg flex flex-col gap-y-5 p-6"}>
                    <h2 className={'text-slate-700 text-2xl font-semibold'}>{session.title}</h2>
                    <p className={'text-justify text-sm'}>{session.description}</p>
                </div>
        </>
    )
}

export default SessionCard