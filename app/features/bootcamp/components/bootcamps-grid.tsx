import { BootcampCard } from "~/components/bootcamp/bootcamp-card";
import EmptyMessage from "~/components/ui/empty-message";
import type { Bootcamp } from "~/types/api";

interface Props {
  bootcamps: Bootcamp[];
  onUpdate?: (bootcamp: Bootcamp) => void;
  onDelete?: (bootcamp: Bootcamp) => void;
}

export const BootcampsGrid = ({ bootcamps, onUpdate, onDelete }: Props) => {

  return (
      bootcamps.length > 0 ? 
      <div className="mt-5 grid grid-cols-3 gap-6">
        {bootcamps.map((bootcamp) => (
            <BootcampCard key={bootcamp.id} bootcamp={bootcamp} onUpdate={onUpdate} onDelete={onDelete}/>
        ))}
      </div>:
      <EmptyMessage text="There is no bootcamp yet." title="No Bootcamps" />
  );
};
