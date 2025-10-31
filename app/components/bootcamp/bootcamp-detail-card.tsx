import { BootcampMethodTag } from "~/components/bootcamp/bootcamp-method-tag";
import { BootcampTypeTag } from "./bootcamp-type-tag";
import { Button } from "~/components/ui/button";
import type { BootcampCategory, BootcampType } from "~/types/api";
import { useRole } from "~/provider/role-testing-provider";
import { Link } from "react-router";

type BootcampDetailCardProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  type: BootcampType;
  category: BootcampCategory;
  onClick: () => void;
};

const BootcampDetailCard = ({
  id,
  name,
  description,
  image,
  type,
  category,
  onClick,
}: BootcampDetailCardProps) => {
  const { role } = useRole();

  return (
    <>
      <div className="flex flex-col bg-white p-6 rounded-xl">
        <div className={"flex gap-8"}>
          <img
            src={`${import.meta.env.VITE_STORAGE_URL}/${image}`}
            alt="bootcamp's image"
            className="rounded-lg border w-80 object-cover"
          />
          <div className={"flex flex-col gap-2 justify-between flex-1"}>
            <div className="flex flex-col gap-3">
              <p className={"text-primary text-3xl font-semibold"}>{name}</p>
              <div className="flex gap-2">
                <BootcampTypeTag type={type.name} />
                <BootcampMethodTag type={category.name} />
              </div>
              <p className={"text-justify"}>{description}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-5 mt-4">
          {role == "admin" && (
            <>
              <Button className="w-fit p-5" onClick={onClick}>
                Add Session
              </Button>
              <Link to={`/admin/bootcamps/${id}/report`}>
                <Button className="w-fit p-5 bg-yellow-500 hover:bg-yellow-400">
                  Student Report & Certificate
                </Button>
              </Link>
              <Link to={`enrollment`}>
                <Button className="w-fit p-5 bg-purple-500 hover:bg-purple-400">
                  View Enrolled Students
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BootcampDetailCard;
