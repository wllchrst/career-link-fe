import { getBootcampTypes } from "~/features/bootcamp-type/api/get-bootcamp-types";
import type { Route } from "./+types/bootcamp-types";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Modal, type ModalType } from "~/components/modal";
import type { BootcampType } from "~/types/api";
import { BootcampTypesList } from "~/features/bootcamp-type/components/bootcamp-types-list";
import { useRevalidator } from "react-router";
import { CreateBootcampType } from "~/features/bootcamp-type/components/create-bootcamp-type";

export const loader = async () => {
  const { data: bootcampTypes } = await getBootcampTypes();

  return { bootcampTypes };
};

const BootcampTypes = ({ loaderData }: Route.ComponentProps) => {
  const [selectedBootcampType, setSelectedBootcampType] =
    useState<BootcampType | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const revalidator = useRevalidator();

  const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
  };

  return (
    <>
      <Modal
        title="Add bootcamp type"
        isOpen={activeModal === "create"}
        onClose={() => setActiveModal(null)}
      >
        <CreateBootcampType onSuccess={onSuccess} />
      </Modal>

      <div className="container flex flex-col mt-2">
        <h1 className="text-2xl text-primary font-bold mb-4">Bootcamp Types</h1>
        <Button
          className="w-fit px-5 py-5"
          onClick={() => setActiveModal("create")}
        >
          Add type
        </Button>
        <BootcampTypesList bootcampTypes={loaderData.bootcampTypes} />
      </div>
    </>
  );
};

export default BootcampTypes;
