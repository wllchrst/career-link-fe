import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { BootcampsCarousel } from "~/features/bootcamp/components/bootcamps-carousel";
import { BootcampsGrid } from "~/features/bootcamp/components/bootcamps-grid";
import type { Route } from "./+types/bootcamps";
import { getBootcamps } from "~/features/bootcamp/api/get-bootcamps";
import { getBootcampTypes } from "~/features/bootcamp-type/api/get-bootcamp-types";
import { getBootcampCategories } from "~/features/bootcamp-category/api/get-bootcamp-categories";


export const loader = async () => {
  
  const { data: categories } = await getBootcampCategories();
  const { data: types } = await getBootcampTypes();
  const { data: bootcamps } = await getBootcamps();


  return { bootcamps, categories, types };
};

const Bootcamps = ({ loaderData }: Route.ComponentProps) => {
  const { bootcamps, types, categories } = loaderData;

  return (
    <div className="container flex flex-col gap-6">
      <div className="flex flex-col gap-3 mt-4">
        <h1 className="text-2xl text-primary font-bold">
          Learners are Viewing
        </h1>
        <BootcampsCarousel bootcamps={bootcamps} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl text-primary font-bold">
          Learn Fast, Grow Faster
        </h1>
        <div>
          Master essential hard and soft skills through our comprehensive
          training programs, accessible anytime, anywhere
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-4 flex gap-5">
            <div className="flex items-center bg-white px-3 py-2 rounded-md w-120">
              <CiSearch className="text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search by Name, Skill Type or Learning Mode"
                className="bg-transparent outline-none px-2 py-1 text-gray-600 w-full"
              />
            </div>
            <button className="bg-accent text-white px-4 py-2 rounded-md">
              Search
            </button>
          </div>
          <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
            <FaFilter />
            <div>Filter</div>
          </div>
        </div>
        <BootcampsGrid bootcamps={bootcamps} />
      </div>
    </div>
  );
};

export default Bootcamps;
