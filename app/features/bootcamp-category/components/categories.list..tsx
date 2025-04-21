import type { BootcampCategory } from "~/types/api";

interface Props {
  categories: BootcampCategory[];
}

export const CategoriesList = ({ categories }: Props) => {
  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          <div>{category.name}</div>
          <div>{category.description}</div>
        </div>
      ))}
    </>
  );
};
