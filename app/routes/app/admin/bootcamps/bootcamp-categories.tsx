import { getBootcampCategories } from "~/features/bootcamp-category/api/get-categories";
import { CategoriesList } from "~/features/bootcamp-category/components/categories.list.";
import type { Route } from "./+types/bootcamp-categories";

export const loader = async () => {
  const { data: categories } = await getBootcampCategories();

  return { categories };
};

const BootcampCategories = ({ loaderData }: Route.ComponentProps) => {
  return (
    <div className="container flex flex-col mt-2">
      <h1 className="text-2xl text-primary font-bold mb-4">Categories list</h1>
      <CategoriesList categories={loaderData.categories} />
    </div>
  );
};

export default BootcampCategories;
