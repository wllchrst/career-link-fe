import { BootcampCard } from "~/components/bootcamp/bootcamp-card";
import type { Bootcamp } from "~/types/api";

interface Props {
  bootcamps: Bootcamp[];
}

export const BootcampsGrid = ({ bootcamps }: Props) => {
  return (
    <div className="mt-5 grid grid-cols-3 gap-6">
      {bootcamps.map((bootcamp) => (
        <BootcampCard key={bootcamp.id} bootcamp={bootcamp} />
      ))}
    </div>
  );
};
