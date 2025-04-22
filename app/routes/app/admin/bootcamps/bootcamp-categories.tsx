import { getBootcampCategories } from "~/features/bootcamp-category/api/get-categories";
import { CategoriesList } from "~/features/bootcamp-category/components/categories.list.";
import type { Route } from "./+types/bootcamp-categories";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Modal, type ModalType } from "~/components/modal";
import { CreateCategory } from "~/features/bootcamp-category/components/create-category";
import { useRevalidator } from "react-router";
import type { BootcampCategory } from "~/types/api";
import { DeleteCategory } from "~/features/bootcamp-category/components/delete-category";

export const loader = async () => {
  const { data: categories } = await getBootcampCategories();

  return { categories };
};

const BootcampCategories = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<BootcampCategory | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const revalidator = useRevalidator();

  const onSuccess = () => {
    setActiveModal(null);
    revalidator.revalidate();
  };

  const onUpdate = (category: BootcampCategory) => {
    setSelectedCategory(category);
  };

  const onDelete = (category: BootcampCategory) => {
    setSelectedCategory(category);
    setActiveModal("delete");
  };

  return (
    <>
      <Modal
        title="Add category"
        isOpen={activeModal === "create"}
        onClose={() => setActiveModal(null)}
      >
        <CreateCategory onSuccess={onSuccess} />
      </Modal>

      <Modal
        title="Delete category"
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      >
        <div>
          <DeleteCategory
            onSuccess={onSuccess}
            onClose={() => setActiveModal(null)}
            selectedCategory={selectedCategory!}
          />
        </div>
      </Modal>

      <div className="container flex flex-col mt-2">
        <h1 className="text-2xl text-primary font-bold mb-4">
          Bootcamp Category
        </h1>
        <Button
          onClick={() => setActiveModal("create")}
          className="w-fit px-5 py-5"
        >
          Add category
        </Button>
        <CategoriesList
          onDelete={onDelete}
          categories={loaderData.categories}
        />
      </div>
    </>
  );
};

export default BootcampCategories;
