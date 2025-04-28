import type { Bootcamp } from "~/types/api";
import { BootcampMethodTag } from "./bootcamp-method-tag";
import { BootcampTypeTag } from "./bootcamp-type-tag";
import { NavLink } from "react-router";
import { useRole } from "~/role-testing-provider";
import { Button } from "../ui/button";

interface Props {
  bootcamp: Bootcamp;
  onUpdate?: (bootcamp: Bootcamp) => void;
  onDelete?: (bootcamp: Bootcamp) => void;
}

export const BootcampCard = ({ bootcamp, onUpdate, onDelete }: Props) => {
  
  const {role} = useRole()

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
        <div  className="flex justify-end gap-5 items-center">

          {role == 'admin' && <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdate?.(bootcamp)}
              className="h-full rounded-md text-center w-25 p-2 text-sm mt-2"
            >
              Update
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(bootcamp)}
              className="h-full text-white rounded-md text-center w-25 p-2 text-sm mt-2"
            >
              Delete
            </Button>
          </>
          }
          <NavLink to={`/bootcamps/${bootcamp.id}`} className={'h-full mt-2'}>
            <Button className="h-full bg-accent text-white rounded-md text-center w-25 p-2 text-sm">
              See Details
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
