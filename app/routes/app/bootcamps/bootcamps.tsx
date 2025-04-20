import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import {
  bootcampsCarouselData,
  bootcampsData,
} from "~/features/bootcamp/bootcamp-dummy-data";
import { BootcampsCarousel } from "~/features/bootcamp/components/bootcamps-carousel";
import { BootcampsGrid } from "~/features/bootcamp/components/bootcamps-grid";
import type { Route } from "./+types/bootcamps";

export const loader = async () => {
  //TODO: api call

  return { bootcampsData, bootcampsCarouselData }; //masih dummy data;
};

const Bootcamps = ({ loaderData }: Route.ComponentProps) => {
  const { bootcampsData, bootcampsCarouselData } = loaderData;

  return (
    <div className="container flex flex-col gap-6">
      <div className="flex flex-col gap-3 mt-4">
        <h1 className="text-2xl text-primary font-bold">
          Learners are Viewing
        </h1>
        <BootcampsCarousel bootcamps={bootcampsCarouselData} />
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
        <BootcampsGrid bootcamps={bootcampsData} />
      </div>
    </div>
  );
};

export default Bootcamps;
