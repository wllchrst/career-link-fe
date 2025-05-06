import { BootcampMethodTag } from "~/components/bootcamp/bootcamp-method-tag";
import { BootcampTypeTag } from "./bootcamp-type-tag";
import { Button } from "~/components/ui/button";
import type { BootcampCategory, BootcampType } from "~/types/api";
import { useRole } from "~/role-testing-provider";

type BootcampDetailCardProps = {
  name: string;
  description: string;
  image: string;
  type: BootcampType;
  category: BootcampCategory;
  onClick: () => void;
};

const BootcampDetailCard = ({
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
      <div className={"flex bg-white p-6 rounded-xl gap-16"}>
        <img
          src={`${import.meta.env.VITE_STORAGE_URL}/${image}`}
          alt="bootcamp's image"
          className="rounded-lg border"
        />
        <div className={"flex flex-col gap-2 justify-between flex-1"}>
          <div className="flex flex-col gap-5">
            <p className={"text-primary text-3xl font-semibold"}>{name}</p>
            <div className="flex gap-2">
              <BootcampTypeTag type={type.name} />
              <BootcampMethodTag type={category.name} />
            </div>
            <p className={"text-justify"}>{description}</p>
          </div>
          <div className="flex justify-end">
            {role == "admin" ? (
              <Button className="w-fit p-5" onClick={onClick}>
                Add Session
              </Button>
            ) : (
              <Button className="w-fit p-5">Enroll Now</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BootcampDetailCard;
