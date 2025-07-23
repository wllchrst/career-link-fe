import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { bootcampsData } from "~/features/bootcamp/bootcamp-dummy-data";
import { BootcampsGrid } from "~/features/bootcamp/components/bootcamps-grid";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/bootcamps";
import { useRevalidator } from "react-router";
import { useState } from "react";
import { Modal, type ModalType } from "~/components/modal";
import { CreateBootcamp } from "~/features/bootcamp/components/create-bootcamp";
import { getBootcampCategories } from "~/features/bootcamp-category/api/get-bootcamp-categories";
import { getBootcampTypes } from "~/features/bootcamp-type/api/get-bootcamp-types";
import { getBootcamps } from "~/features/bootcamp/api/get-bootcamps";
import type { Bootcamp, User } from "~/types/api";
import { DeleteBootcamp } from "~/features/bootcamp/components/delete-bootcamp";
import { UpdateBootcamp } from "~/features/bootcamp/components/update-bootcamp";

export const loader = async () => {
  const { data: categories } = await getBootcampCategories();
  const { data: bootcampTypes } = await getBootcampTypes();
  const { data: bootcamps } = await getBootcamps();

  return { bootcamps, categories, bootcampTypes };
};

const Bootcamps = ({ loaderData }: Route.ComponentProps) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const revalidator = useRevalidator();

  //TODO: untuk testing create bootcamp aja
  const dummySpeakers: User[] = [
    {
      id: "000df53b-f9e1-487c-a564-b0da889eee3d",
      name: "dummy speaker",
      phone: "dummy phone",
      email: "dummy_spekaer@email.com",
      future_position: "dummy",
      skill: "dummy",
      student_attempts: [],
      session_attendances: [],
      session_assignment_results: [],
    },
  ];

  const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
  };
  const [selectedBootcamp, setSelectedBootcamp] = useState<Bootcamp | null>(
    null
  );

  const onUpdate = (bootcamp: Bootcamp) => {
    setSelectedBootcamp(bootcamp);
    setActiveModal("update");
  };

  const onDelete = (bootcamp: Bootcamp) => {
    setSelectedBootcamp(bootcamp);
    setActiveModal("delete");
  };

  const { bootcamps, categories, bootcampTypes } = loaderData;

  return (
    <>
      <Modal
        title="Add Bootcamp"
        isOpen={activeModal === "create"}
        onClose={() => setActiveModal(null)}
      >
        <CreateBootcamp
          categories={categories}
          types={bootcampTypes}
          speakers={dummySpeakers}
          onSuccess={onSuccess}
        />
      </Modal>
      <Modal
        title="Update bootcamp"
        isOpen={activeModal === "update"}
        onClose={() => setActiveModal(null)}
      >
        <UpdateBootcamp
          onSuccess={onSuccess}
          bootcamp={selectedBootcamp!}
          categories={categories}
          types={bootcampTypes}
          speakers={[]}
        />
      </Modal>

      <Modal
        title="Delete bootcamp"
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        <div>
          <DeleteBootcamp
            onSuccess={onSuccess}
            onClose={() => setActiveModal(null)}
            selectedCategory={selectedBootcamp!}
          />
        </div>
      </Modal>

      <div className="container flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-2xl text-primary font-bold mb-4">Bootcamps</h1>
          <div className="flex justify-between items-center">
            <div className="mt-4 flex gap-5">
              <Button
                className="w-fit px-5 py-5"
                onClick={() => setActiveModal("create")}
              >
                Add Bootcamp
              </Button>
            </div>
            <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
              <FaFilter />
              <div>Filter</div>
            </div>
          </div>
          <BootcampsGrid
            bootcamps={bootcamps}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      </div>
    </>
  );
};

export default Bootcamps;
