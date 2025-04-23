import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { bootcampsData } from "~/features/bootcamp/bootcamp-dummy-data";
import { BootcampsGrid } from "~/features/bootcamp/components/bootcamps-grid";
import type { Route } from "./+types/bootcamps";
import { Button } from "~/components/ui/button";

export const loader = async () => {
  return { bootcampsData }; //masih dummy data;
};

const Bootcamps = ({ loaderData }: Route.ComponentProps) => {
  const { bootcampsData } = loaderData;

  return (
    <div className="container flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-2xl text-primary font-bold mb-4">Bootcamps</h1>
        <div className="flex justify-between items-center">
          <div className="mt-4 flex gap-5">
            <Button className="w-fit px-5 py-5">Add Bootcamp</Button>
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
