import { getBootcampCategories } from "~/features/bootcamp-category/api/get-categories";
import { CategoriesList } from "~/features/bootcamp-category/components/categories.list.";
import type { Route } from "./+types/bootcamp-categories";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Modal } from "~/components/modal";
import { AddCategoryForm } from "~/features/bootcamp-category/components/add-category-form";
import { useRevalidator } from "react-router";

export const loader = async () => {
  const { data: categories } = await getBootcampCategories();

  return { categories };
};

const BootcampCategories = ({ loaderData }: Route.ComponentProps) => {
  const [open, setOpen] = useState(false);
  const revalidator = useRevalidator();

  const onSuccess = () => {
    setOpen(false);
    revalidator.revalidate();
  };

  return (
    <>
      <Modal title="Add category" isOpen={open} onClose={() => setOpen(false)}>
        <AddCategoryForm onSuccess={() => onSuccess()} />
      </Modal>

      <div className="container flex flex-col mt-2">
        <h1 className="text-2xl text-primary font-bold mb-4">
          Bootcamp Category
        </h1>
        <Button onClick={() => setOpen(true)} className="w-fit px-5 py-5">
          Add category
        </Button>
        <CategoriesList categories={loaderData.categories} />
      </div>
    </>
  );
};

export default BootcampCategories;
