import BootcampDetailCard from "~/components/bootcamp/bootcamp-detail-card";
import { getBootcamp } from "~/features/bootcamp/api/get-bootcamp";
import type { Route } from "./+types/bootcamp-detail";
import { getBootcampCategory } from "~/features/bootcamp-category/api/get-bootcamp-category";
import { getBootcampType } from "~/features/bootcamp-type/api/get-bootcamp-type";
import { Modal, type ModalType } from "~/components/modal";
import { useRevalidator } from "react-router";
import { useState } from "react";
import { CreateSession } from "~/features/session/components/create-session";
import SessionsGrid from "~/features/session/components/sessions-grid";


export const loader = async ({ params }: Route.LoaderArgs) => {

    const { data: bootcamp } = await getBootcamp(params.bootcamp);
    const { data: category } = await getBootcampCategory(bootcamp.category_id);
    const { data: type } = await getBootcampType(bootcamp.type_id);
    
    return { bootcamp, category, type };
 

};

const BootcampDetail = ({ loaderData }: Route.ComponentProps) => {

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const revalidator = useRevalidator();
  
  const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
  };
  
  const { bootcamp, category, type } = loaderData;

  return (
    <>
      <Modal 
          title="Add Bootcamp's Session"
          isOpen={activeModal === "create"}
          onClose={() => setActiveModal(null)}
        >
            <CreateSession bootcamp={bootcamp} onSuccess={onSuccess} />
      </Modal>
      <div className={"flex flex-col gap-8 max-w-[100rem]"}>
        <BootcampDetailCard name={bootcamp.name} description={bootcamp.description} category={category} type={type} image={bootcamp.image_path} onClick={() => setActiveModal('create')}/>
        <SessionsGrid sessions={bootcamp.sessions ?? []}/>
      </div>
    </>
  );
};

export default BootcampDetail;
