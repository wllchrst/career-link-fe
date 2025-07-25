import { BootcampCard } from "~/components/bootcamp/bootcamp-card";
import type { Bootcamp } from "~/types/api";

interface Props {
  bootcamps: Bootcamp[];
  viewMode?: "grid" | "list";
  onUpdate?: (bootcamp: Bootcamp) => void;
  onDelete?: (bootcamp: Bootcamp) => void;
}

export const BootcampsGrid = ({
  bootcamps,
  viewMode = "grid",
  onUpdate,
  onDelete,
}: Props) => {
  return (
    <div className="space-y-4">
      <div
        className={
          viewMode === "grid"
            ? "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "space-y-4"
        }
      >
        {bootcamps.map((bootcamp) => (
          <BootcampCard
            key={bootcamp.id}
            bootcamp={bootcamp}
            viewMode={viewMode}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
