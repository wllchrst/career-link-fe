import { getBootcampCategories } from "~/features/bootcamp-category/api/get-categories";
import { CategoriesList } from "~/features/bootcamp-category/components/categories.list.";
import type { Route } from "./+types/bootcamp-categories";

export const loader = async () => {
  const { data: categories } = await getBootcampCategories();

  return { categories };
};

const BootcampCategories = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <CategoriesList categories={loaderData.categories} />
    </>
  );
};

export default BootcampCategories;
