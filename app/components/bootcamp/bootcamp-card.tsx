import type { Bootcamp } from "~/types/api";
import { BootcampMethodTag } from "./bootcamp-method-tag";
import { BootcampTypeTag } from "./bootcamp-type-tag";
import { NavLink } from "react-router";
import { useRole } from "~/provider/role-testing-provider";
import { Button } from "../ui/button";

interface Props {
  bootcamp: Bootcamp;
  onUpdate?: (bootcamp: Bootcamp) => void;
  onDelete?: (bootcamp: Bootcamp) => void;
}

export const BootcampCard = ({ bootcamp, onUpdate, onDelete }: Props) => {
  const { role } = useRole();

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:shadow-lg">
      <img
        src={`${import.meta.env.VITE_STORAGE_URL}/${bootcamp.image_path}`}
        alt={bootcamp.name}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="text-lg font-semibold text-gray-800 line-clamp-2">
          {bootcamp.name}
        </div>
        <div className="flex flex-wrap gap-2">
          {/* <BootcampTypeTag type={bootcamp.types.name} />
          <BootcampMethodTag type={bootcamp.categories.name} /> */}
        </div>
        <div className="text-sm text-gray-600 line-clamp-4">
          {bootcamp.description}
        </div>
        <div className="mt-3 flex flex-wrap justify-between items-center gap-2">
          <NavLink to={`/bootcamps/${bootcamp.id}`}>
            <Button className="bg-accent text-white hover:bg-accent/90 text-sm px-4 py-2 rounded-md">
              See Details
            </Button>
          </NavLink>

          {role === "admin" && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdate?.(bootcamp)}
                className="text-sm px-3 py-2"
              >
                Update
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete?.(bootcamp)}
                className="text-sm px-3 py-2"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
