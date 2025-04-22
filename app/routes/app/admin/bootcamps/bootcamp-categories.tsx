import { getBootcampCategories } from "~/features/bootcamp-category/api/get-categories";
import { CategoriesList } from "~/features/bootcamp-category/components/categories.list.";
import type { Route } from "./+types/bootcamp-categories";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Modal } from "~/components/modal";

export const loader = async () => {
  const { data: categories } = await getBootcampCategories();

  return { categories };
};

const BootcampCategories = ({ loaderData }: Route.ComponentProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div>test</div>
      </Modal>

      <div className="container flex flex-col mt-2">
        <h1 className="text-2xl text-primary font-bold mb-4">Category</h1>
        <Button onClick={() => setOpen(true)} className="w-fit px-5 py-5">
          Add category
        </Button>
        <CategoriesList categories={loaderData.categories} />
      </div>
    </>
  );
};

export default BootcampCategories;
