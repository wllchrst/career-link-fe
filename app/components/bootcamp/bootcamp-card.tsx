import type { Bootcamp } from "~/types/api";
import { BootcampMethodTag } from "./bootcamp-method-tag";
import { BootcampTypeTag } from "./bootcamp-type-tag";
import { NavLink } from "react-router";

interface BootcampCardProps {
  bootcamp: Bootcamp;
}

export const BootcampCard = ({ bootcamp }: BootcampCardProps) => {
  console.log(bootcamp)
  return (
    <div className="flex flex-col bg-white shadow rounded-md">
      <img
        src={`${import.meta.env.VITE_STORAGE_URL}/${bootcamp.image_path}`}
        alt=""
        className="h-55 rounded-t-md"
      />
      <div className="flex flex-col p-3 gap-1">
        <div className="text-lg">{bootcamp.name}</div>
        <div className="flex gap-2">
          {/* <BootcampTypeTag type={bootcamp.types.name} />
          <BootcampMethodTag type={bootcamp.categories.name} /> */}
        </div>
        <div className="text-xs text-justify my-2">{bootcamp.description}</div>
        <NavLink to={`/bootcamps/${bootcamp.id}`} className="flex justify-end">
          <div className="bg-accent text-white rounded-md text-center w-30 p-2 text-sm mt-2">
            See Details
          </div>
        </NavLink>
      </div>
    </div>
  );
};
