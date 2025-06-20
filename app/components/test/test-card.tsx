import TableLayout from "~/components/layouts/table-layout";
import { Link, useNavigate, useRevalidator } from "react-router";
import { TableCell, TableRow } from "../ui/table";
import { useRole } from "~/provider/role-testing-provider";
import { Button } from "../ui/button";
import { Modal, type ModalType } from "../modal";
import { useState } from "react";
import { CreateUpdateTest } from "~/features/quiz/components/create-update-test";
import { TestType } from "~/types/enum";
import type { SessionTest, StudentAttempt, StudentScore } from "~/types/api";
import EmptyMessage from "../ui/empty-message";
import { format, formatDate } from "date-fns";
import { DeleteTest } from "~/features/quiz/components/delete-test";
import { createStudentAttempt } from "~/features/quiz/api/attempt/create-student-attempt";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { DefaultTableHeader } from "../ui/table-header";
import TestInformationCard from "./test-information-card";

interface Props {
  sessionId: string;
  testType: TestType;
  test: SessionTest | undefined;
  attempts: StudentScore[];
}

const TestCard = ({ sessionId, testType, test, attempts }: Props) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const revalidator = useRevalidator();
  const navigate = useNavigate()

  const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
  };

  const takeTest = async () => {
    if (test){
      const toastId = toast.loading("Loading...");
      try {
        if (new Date().getTime() < new Date(test.open_date).getTime()){
          toast.error("The test has not started yet!", {
            id: toastId,
          });
          return
        }
        if (new Date(test.close_date).getTime() < new Date().getTime()){
          toast.error("The test has already ended!", {
            id: toastId,
          });
          return
        }
        
        const {data: attempt} = await createStudentAttempt({data: {
          user_id: 'sdf',
          test_id: test.id
        }})
        toast.success("You will be redirected to test page", { id: toastId });
        setTimeout(() => {
          navigate(`test/${test.id}/attempt/${attempt.id}`)
        }, 2000);

      } catch (error) {
        toast.error(getErrorMessage(error), {
          id: toastId,
        });
      }
      
    }
  }

  const { role } = useRole();

  return (
    <>
      <Modal
        title={`Add ${testType?.replace("_", " ")}`}
        isOpen={activeModal === "create"}
        onClose={() => setActiveModal(null)}
      >
        <CreateUpdateTest
          testType={testType}
          sessionId={sessionId}
          onSuccess={onSuccess}
        />
      </Modal>
      {test ? (
        <>
          <Modal
            title={`Update ${testType?.replace("_", " ")}`}
            isOpen={activeModal === "update"}
            onClose={() => setActiveModal(null)}
          >
            <CreateUpdateTest
              test={test}
              sessionId={sessionId}
              testType={test.type}
              onSuccess={onSuccess}
            />
          </Modal>
          <Modal
            title={`Delete ${testType?.replace("_", " ")}`}
            isOpen={activeModal === "delete"}
            onClose={() => setActiveModal(null)}
          >
            <DeleteTest
              selectedCategory={test}
              onClose={() => setActiveModal(null)}
              onSuccess={onSuccess}
            />
          </Modal>
          <TestInformationCard test={test} minimum_score={test.minimum_score} score={attempts.length > 0 ? Math.max(...attempts.map(e => Math.ceil(e.score))):0}/>
          {role == 'user' && <>
          <h4></h4>
            <TableLayout header={<DefaultTableHeader columns={["Attempt", "State", "Duration", "Score"]}/>}>
              {
                attempts.length < 1?
                <EmptyMessage title="No Attempts" text="You haven't made any attempts yet."/>:
                attempts.filter(e => e.attempt.done_at != null).sort((a,b) => new Date(a.attempt.done_at).getTime() - new Date(b.attempt.done_at).getTime()).map((e, idx) => 
                <TableRow className="flex w-full border-b-1 border-gray-200">
                    <TableCell className="w-1/4 text-center">{idx + 1}</TableCell>
                    <TableCell className="w-1/4 text-center">{`Submitted at ${formatDate(new Date(e.attempt.done_at), 'MM/dd/yyyy HH:mm:ss')}`}</TableCell>
                    <TableCell className="w-1/4 text-center">{Math.ceil((new Date(e.attempt.done_at).getTime() - new Date(e.attempt.created_at).getTime()) /1000 / 60)} Minutes</TableCell>
                    <TableCell className="w-1/4 text-center">{Math.ceil(e.score)}</TableCell>
                </TableRow>
                )
              }
            </TableLayout>
          </>}
          <div className={"w-full flex justify-between items-end"}>
            <div>
              <h4>Grading Method : Highest grade</h4>
              <h4>Attempts Allowed: {test.attempt_count}</h4>
              <h4>Minimum passing score: {test.minimum_score}</h4>
            </div>
            <div className="flex gap-5 justify-start items-center">
              {role != "admin" ? (attempts.length < parseInt(test.attempt_count) && new Date(test.close_date).getTime() > new Date().getTime()) && (
                <>
                {/* TODO: attempts.sort ganti ke yang lain / fetch semua attempt */}
                  {
                    (attempts.length < 1 || attempts.sort((a,b) => new Date(a.attempt.created_at).getTime() - new Date(b.attempt.created_at).getTime())[attempts.length - 1].attempt.done_at)?  
                    <Button className={
                      "bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out"
                    }
                    onClick={takeTest}
                    >
                      Take Test
                    </Button>
                    :
                    <Link to={`test/${test.id}/attempt/${attempts[attempts.length - 1]?.id}`}>
                      <Button className={"p-2 w-40 bg-purple-600 hover:bg-purple-500"}>Continue Test</Button>
                    </Link>
                  }
                </>
              ) : (
                <>
                  <Link to={`test/${test.id}/result`}>
                    <Button className={"p-2 w-40 bg-purple-600 hover:bg-purple-500"}>View Result</Button>
                  </Link>
                  <Link to={`test/${test.id}/manage`}>
                    <Button className={"p-2 w-40"}>Manage Test</Button>
                  </Link>
                  <Button
                    className={"p-2 w-40"}
                    variant="outline"
                    onClick={() => setActiveModal("update")}
                  >
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    className={"p-2 w-40"}
                    onClick={() => setActiveModal("delete")}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <EmptyMessage
            text={`there are no ${testType} yet. please contact the admin or create a new one`}
            title={`No ${testType}`}
          />
          {role == "admin" && (
            <Button
              className={
                "bg-slate-500 text-white rounded-md p-2 w-40 hover:bg-slate-700 transition duration-200 ease-in-out"
              }
              onClick={() => setActiveModal("create")}
            >
              Add New Test
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default TestCard;
