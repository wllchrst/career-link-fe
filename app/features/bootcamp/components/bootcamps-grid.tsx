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
    <div className="mt-8">
      {bootcamps.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bootcamps.map((bootcamp) => (
            <BootcampCard
              key={bootcamp.id}
              bootcamp={bootcamp}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyMessage text="There is no bootcamp yet." title="No Bootcamps" />
      )}
    </div>
  );
};
