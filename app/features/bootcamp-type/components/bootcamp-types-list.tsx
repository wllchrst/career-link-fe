import { Button } from "~/components/ui/button";
import type { BootcampType } from "~/types/api";

interface Props {
  bootcampTypes: BootcampType[];
  onUpdate?: (bootcampType: BootcampType) => void;
  onDelete?: (bootcampType: BootcampType) => void;
}

export const BootcampTypesList = ({
  bootcampTypes,
  onUpdate,
  onDelete,
}: Props) => {
  return (
    <div className="overflow-x-auto mt-6">
      {bootcampTypes.length === 0 ? (
        <div className="min-w-full border border-gray-200 bg-white text-center py-6 text-sm text-gray-500">
          No bootcamp types found.
        </div>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-white text-left">
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bootcampTypes.map((bootcampType) => (
              <tr key={bootcampType.id} className="border-b bg-white">
                <td className="px-4 py-2">{bootcampType.name}</td>
                <td className="px-4 py-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdate?.(bootcampType)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete?.(bootcampType)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
