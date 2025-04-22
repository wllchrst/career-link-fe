import type { BootcampCategory } from "~/types/api";
import { Button } from "~/components/ui/button";

interface Props {
  categories: BootcampCategory[];
  onUpdate?: (category: BootcampCategory) => void;
  onDelete?: (category: BootcampCategory) => void;
}

export const CategoriesList = ({ categories, onUpdate, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-white text-left">
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b bg-white">
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">{category.description}</td>
              <td className="px-4 py-2 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdate?.(category)}
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete?.(category)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
