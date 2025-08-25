import BootcampDetailCard from "~/components/bootcamp/bootcamp-detail-card";
import { getBootcamp } from "~/features/bootcamp/api/get-bootcamp";
import type { Route } from "./+types/bootcamp-detail";
import { getBootcampCategory } from "~/features/bootcamp-category/api/get-bootcamp-category";
import { getBootcampType } from "~/features/bootcamp-type/api/get-bootcamp-type";
import { Modal, type ModalType } from "~/components/modal";
import { useRevalidator } from "react-router";
import { useEffect, useState } from "react";
import { CreateUpdateSession } from "~/features/session/components/create-session";
import SessionsGrid from "~/features/session/components/sessions-grid";
import { type Bootcamp, type BootcampCategory, type BootcampType, type Session } from "~/types/api";
import { DeleteSession } from "~/features/session/components/delete-session";

export const loader = async ({ params }: Route.LoaderArgs) => {
  return {id: params.bootcamp}
};

const BootcampDetail = ({ loaderData }: Route.ComponentProps) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const revalidator = useRevalidator();
  const [selectedSession, setSelectedSession] = useState<Session>();
  const [bootcamp, setBootcamp] = useState<Bootcamp>()
  const [bootcampType, setBootcampType] = useState<BootcampType>()
  const [bootcampCategory, setBootcampCategory] = useState<BootcampCategory>()


  const fetchBootcamp = async () => {
      const { data: bootcamp } = await getBootcamp(loaderData.id);
      const { data: category } = await getBootcampCategory(bootcamp.category_id);
      const { data: type } = await getBootcampType(bootcamp.type_id);


      setBootcamp(bootcamp)
      setBootcampCategory(category)
      setBootcampType(type)
  }

  useEffect(() => {
    fetchBootcamp()
  }, [])  


  const onUpdateSession = (session: Session) => {
    setSelectedSession(session);
    setActiveModal("update");
  };

  const onDeleteSession = (session: Session) => {
    setSelectedSession(session);
    setActiveModal("delete");
  };

  const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
  };

  if (!bootcamp || !bootcampCategory || !bootcampType){
    return null
  }

  return (
    <>
      <Modal
        title="Add Bootcamp's Session"
        isOpen={activeModal === "create"}
        onClose={() => setActiveModal(null)}
      >
        <CreateUpdateSession bootcamp={bootcamp} onSuccess={onSuccess} />
      </Modal>
      <Modal
        title="Update Bootcamp's Session"
        isOpen={activeModal === "update"}
        onClose={() => setActiveModal(null)}
      >
        <CreateUpdateSession
          bootcamp={bootcamp}
          onSuccess={onSuccess}
          session={selectedSession}
        />
      </Modal>
      <Modal
        title="Delete Bootcamp's Session"
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        <DeleteSession onSuccess={onSuccess} question={selectedSession} />
      </Modal>
      <div className={"container flex flex-col gap-8"}>
        <BootcampDetailCard
          id={bootcamp.id}
          name={bootcamp.name}
          description={bootcamp.description}
          category={bootcampCategory}
          type={bootcampType}
          image={bootcamp.image_path}
          onClick={() => setActiveModal("create")}
        />
        <SessionsGrid
          onDeleteSession={onDeleteSession}
          onUpdateSession={onUpdateSession}
          bootcampId={bootcamp.id}
          sessions={bootcamp.sessions ?? []}
        />
      </div>
    </>
  );
};

export default BootcampDetail;
