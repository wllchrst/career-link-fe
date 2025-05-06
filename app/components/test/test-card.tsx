import TableLayout from "~/components/layouts/table-layout";
import { Link, useRevalidator } from "react-router";
import { TableCell, TableRow } from "../ui/table";
import { useRole } from "~/role-testing-provider";
import { Button } from "../ui/button";
import { Modal, type ModalType } from "../modal";
import { useState } from "react";
import { CreateUpdateTest } from "~/features/quiz/components/create-update-test";
import { TestType } from "~/types/enum";
import type { SessionTest } from "~/types/api";
import EmptyMessage from "../ui/empty-message";
import { format } from "date-fns";
import { DeleteTest } from "~/features/quiz/components/delete-test";

interface Props {
  sessionId: string;
  testType: TestType;
  test: SessionTest | undefined;
}

const TestCard = ({ sessionId, testType, test }: Props) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const revalidator = useRevalidator();
  const [selectedTest, setSelectedTest] = useState();

  const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
  };

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
          <div className={"w-full flex justify-between items-start"}>
            <div>
              <h2 className="font-bold text-xl my-2">{test.title}</h2>
              <h4>
                Opened: {format(new Date(test.open_date), "MM/dd/yyyy HH:mm")}
              </h4>
              <h4>
                Closed: {format(new Date(test.close_date), "MM/dd/yyyy HH:mm")}
              </h4>
            </div>
            {/* <h2 className={'font-bold'}>Highest Grade: 95.00 / 100.00</h2> */}
          </div>
          <div className={"w-full flex justify-between items-start"}>
            <div>
              <h4>Grading Method : Highest grade</h4>
              <h4>Attempts Allowed: 2</h4>
            </div>
            <div className="flex gap-5 justify-start items-center">
              {role != "admin" ? (
                <Link to={`test/${test.id}`}>
                  <Button
                    className={
                      "bg-[var(--accent)] text-white rounded-md p-2 w-40 hover:bg-[var(--secondary)] transition duration-200 ease-in-out"
                    }
                  >
                    Take Test
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to={`test/manage/${test.id}`}>
                    <Button className={"p-2 w-40"}>View Detail</Button>
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
