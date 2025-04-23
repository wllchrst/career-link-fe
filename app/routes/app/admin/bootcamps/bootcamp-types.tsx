import { getBootcampTypes } from "~/features/bootcamp-type/api/get-bootcamp-types";
import type { Route } from "./+types/bootcamp-types";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Modal, type ModalType } from "~/components/modal";
import type { BootcampType } from "~/types/api";
import { BootcampTypesList } from "~/features/bootcamp-type/components/bootcamp-types-list";
import { useRevalidator } from "react-router";
import { CreateBootcampType } from "~/features/bootcamp-type/components/create-bootcamp-type";
import { UpdateBootcampType } from "~/features/bootcamp-type/components/update-bootcamp-type";
import { DeleteBootcampType } from "~/features/bootcamp-type/components/delete-bootcamp-type";

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

  const onUpdate = (bootcampType: BootcampType) => {
    setSelectedBootcampType(bootcampType);
    setActiveModal("update");
  };

  const onDelete = (bootcampType: BootcampType) => {
    setSelectedBootcampType(bootcampType);
    setActiveModal("delete");
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

      <Modal
        title="Update bootcamp type"
        isOpen={activeModal === "update"}
        onClose={() => setActiveModal(null)}
      >
        <UpdateBootcampType
          onSuccess={onSuccess}
          selectedBootcampType={selectedBootcampType!}
        />
      </Modal>

      <Modal
        title="Delete bootcamp type"
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        <div></div>
        <DeleteBootcampType
          onSuccess={onSuccess}
          selectedBootcampType={selectedBootcampType!}
        />
      </Modal>

      <div className="container flex flex-col mt-2">
        <h1 className="text-2xl text-primary font-bold mb-4">Bootcamp Types</h1>
        <Button
          className="w-fit px-5 py-5"
          onClick={() => setActiveModal("create")}
        >
          Add type
        </Button>
        <BootcampTypesList
          bootcampTypes={loaderData.bootcampTypes}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </>
  );
};

export default BootcampTypes;
