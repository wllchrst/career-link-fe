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

export const loader = async () => {
  
  const { data: categories } = await getBootcampCategories();
  const { data: bootcampTypes } = await getBootcampTypes();

  return { bootcampsData, categories, bootcampTypes }; //masih dummy data;
};

const Bootcamps = ({ loaderData }: Route.ComponentProps) => {

  const [activeModal, setActiveModal] = useState<ModalType>(null);
      const revalidator = useRevalidator();
  
    const onSuccess = () => {
      setActiveModal(null);
      revalidator.revalidate();
    };
    

    
  const { bootcampsData, categories, bootcampTypes } = loaderData;

  return (<>
     <Modal 
          title="Add Bootcamp"
          isOpen={activeModal === "create"}
          onClose={() => setActiveModal(null)}
        >
          <CreateBootcamp categories={categories} types={bootcampTypes} speakers={[]} onSuccess={onSuccess} />
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
        <BootcampsGrid bootcamps={bootcampsData} />
      </div>
    </div>
  </>
  );
};

export default Bootcamps;
