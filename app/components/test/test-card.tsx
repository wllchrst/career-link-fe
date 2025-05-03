import TableLayout from "~/components/layouts/table-layout";
import {Link, useRevalidator} from "react-router";
import { TableCell, TableRow } from "../ui/table";
import { useRole } from "~/role-testing-provider";
import { Button } from "../ui/button";
import { Modal, type ModalType } from "../modal";
import { useState } from "react";
import { CreateTest } from "~/features/quiz/components/create-test";
import { TestType } from "~/types/enum";
import type { SessionTest } from "~/types/api";

interface Props{
    sessionId: string;
    testType: TestType;
    test: SessionTest;
}

const TestCard = ({sessionId, testType, test}:Props) => {

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
            title={`Add ${testType?.replace('_', ' ')}`}
            isOpen={activeModal === "create"}
            onClose={() => setActiveModal(null)}
          >
              <CreateTest testType={testType} sessionId={sessionId} onSuccess={onSuccess} />
        </Modal>
            <div className={'w-full flex justify-between items-start'}>
                <div>
                    <h4>Opened: Tuesday, 11 May 2025, 12:00 PM</h4>
                    <h4>Closed: Friday, 14 May 2025, 12:00 PM</h4>
                </div>
                {/* <h2 className={'font-bold'}>Highest Grade: 95.00 / 100.00</h2> */}
            </div>
            <div className={'w-full flex justify-between items-start'}>
                <div>
                    <h4>Grading Method  : Highest grade</h4>
                    <h4>Attempts Allowed: 2</h4>
                </div>
            </div>
            
            <div className="flex gap-5 justify-start items-center">
                {role != 'admin'?
                    <Link to={'/quiz'}>
                        <Button
                            className={'bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out'}>
                            Attempt Test
                        </Button>
                    </Link>:
                    <>
                        <Button
                            className={'bg-slate-500 text-white rounded-md p-2 w-40 hover:bg-slate-700 transition duration-200 ease-in-out'}
                            onClick={() => setActiveModal('create')}
                        >
                            Add New Test
                        </Button>
                        <Button
                            className={'bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out'}>
                            Update
                        </Button>
                        <Button
                            className={'bg-red-500 text-white rounded-md p-2 w-40 hover:bg-red-700 transition duration-200 ease-in-out'}>
                            Delete
                        </Button>
                    </>
                }
            </div>
        </>
    )
}

export default TestCard;