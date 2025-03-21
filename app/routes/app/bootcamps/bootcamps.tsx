import { BootcampCard } from "~/components/bootcamp/bootcamp-card";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import type { Bootcamp } from "~/types/api";
import { BootcampsCarousel } from "~/features/bootcamp/components/bootcamps-carousel";
import { BootcampsGrid } from "~/features/bootcamp/components/bootcamps-grid";

export const bootcampsCarouselData: Bootcamp[] = [
  {
    id: "1",
    name: "Bootcamp Name",
    type: "Hard Skill",
    method: "Self Learning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adisipicing elit, sed do eiusmod temopor incididunt ut labore et dolore magna aliqua...",
  },
  {
    id: "2",
    name: "Bootcamp Name",
    type: "Hard Skill",
    method: "Self Learning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adisipicing elit, sed do eiusmod temopor incididunt ut labore et dolore magna aliqua...",
  },
  {
    id: "3",
    name: "Bootcamp Name",
    type: "Hard Skill",
    method: "Self Learning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adisipicing elit, sed do eiusmod temopor incididunt ut labore et dolore magna aliqua...",
  },
];

export const bootcampsData: Bootcamp[] = [
  {
    id: "1",
    name: "Bootcamp Name",
    type: "Hard Skill",
    method: "Self Learning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adisipicing elit, sed do eiusmod temopor incididunt ut labore et dolore magna aliqua...",
  },
  {
    id: "2",
    name: "Bootcamp Name",
    type: "Hard Skill",
    method: "Self Learning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adisipicing elit, sed do eiusmod temopor incididunt ut labore et dolore magna aliqua...",
  },
  {
    id: "3",
    name: "Bootcamp Name",
    type: "Hard Skill",
    method: "Self Learning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adisipicing elit, sed do eiusmod temopor incididunt ut labore et dolore magna aliqua...",
  },
  {
    id: "4",
    name: "Bootcamp Name",
    type: "Hard Skill",
    method: "Self Learning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adisipicing elit, sed do eiusmod temopor incididunt ut labore et dolore magna aliqua...",
  },
];

const Bootcamps = () => {
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
