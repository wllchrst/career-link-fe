import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useRevalidator } from "react-router";

import { Button } from "~/components/ui/button";
import { NavbarContentLayout } from "~/components/layouts/navbar-content-layout";
import { Modal, type ModalType } from "~/components/modal";

import { BootcampsGrid } from "~/features/bootcamp/components/bootcamps-grid";
import { CreateBootcamp } from "~/features/bootcamp/components/create-bootcamp";
import { UpdateBootcamp } from "~/features/bootcamp/components/update-bootcamp";
import { DeleteBootcamp } from "~/features/bootcamp/components/delete-bootcamp";

import { getBootcampCategories } from "~/features/bootcamp-category/api/get-bootcamp-categories";
import { getBootcampTypes } from "~/features/bootcamp-type/api/get-bootcamp-types";
import { getBootcamps } from "~/features/bootcamp/api/get-bootcamps";

import type { Bootcamp, User } from "~/types/api";
import type { Route } from "./+types/bootcamps";
import { Plus } from "lucide-react";

export const loader = async () => {
  const { data: categories } = await getBootcampCategories();
  const { data: bootcampTypes } = await getBootcampTypes();
  const { data: bootcamps } = await getBootcamps();

  return { bootcamps, categories, bootcampTypes };
};

const Bootcamps = ({ loaderData }: Route.ComponentProps) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedBootcamp, setSelectedBootcamp] = useState<Bootcamp | null>(
    null
  );

  const revalidator = useRevalidator();
  const { bootcamps, categories, bootcampTypes } = loaderData;

  const onSuccess = () => {
    setActiveModal(null);
    setSelectedBootcamp(null);
    revalidator.revalidate();
  };

  const dummySpeakers: User[] = [
    {
      id: "000df53b-f9e1-487c-a564-b0da889eee3d",
      name: "Dummy Speaker",
      phone: "dummy phone",
      email: "dummy_speaker@email.com",
      future_position: "dummy",
      skill: "dummy",
      student_attempts: [],
      session_attendances: [],
      session_assignment_results: [],
    },
  ];

  return (
    <>
      {/* Create Bootcamp Modal */}
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

      {/* Update Bootcamp Modal */}
      <Modal
        title="Update Bootcamp"
        isOpen={activeModal === "update"}
        onClose={() => setActiveModal(null)}
      >
        <UpdateBootcamp
          bootcamp={selectedBootcamp!}
          categories={categories}
          types={bootcampTypes}
          speakers={dummySpeakers}
          onSuccess={onSuccess}
        />
      </Modal>

      {/* Delete Bootcamp Modal */}
      <Modal
        title="Delete Bootcamp"
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        <DeleteBootcamp
          selectedCategory={selectedBootcamp!}
          onSuccess={onSuccess}
          onClose={() => setActiveModal(null)}
        />
      </Modal>

      <NavbarContentLayout
        title="Bootcamps"
        subtitle="Manage all bootcamps available in the system"
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <Button size="sm" onClick={() => setActiveModal("create")}>
              <Plus className="h-4 w-4" />
              Add Bootcamp
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FaFilter className="text-muted-foreground" />
              Filter
            </Button>
          </div>

          {bootcamps.length === 0 ? (
            <div className="text-center text-muted-foreground mt-20">
              No bootcamps available.
            </div>
          ) : (
            <BootcampsGrid
              bootcamps={bootcamps}
              onUpdate={(bootcamp) => {
                setSelectedBootcamp(bootcamp);
                setActiveModal("update");
              }}
              onDelete={(bootcamp) => {
                setSelectedBootcamp(bootcamp);
                setActiveModal("delete");
              }}
            />
          )}
        </div>
      </NavbarContentLayout>
    </>
  );
};

export default Bootcamps;
