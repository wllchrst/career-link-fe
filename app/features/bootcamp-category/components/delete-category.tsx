import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import type { BootcampCategory } from "~/types/api";
import { deleteBootcampCategory } from "../api/delete-category";
import { getErrorMessage } from "~/lib/error";

interface Props {
  onSuccess: () => void;
  onClose?: () => void;
  selectedCategory: BootcampCategory;
}

export const DeleteCategory = ({
  onSuccess,
  onClose,
  selectedCategory,
}: Props) => {
  const onDelete = async () => {
    const toastId = toast.loading("Deleting category...");

    try {
      await deleteBootcampCategory(selectedCategory.id);

      toast.success("Delete category success", { id: toastId });

      onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p>
        Are you sure you want to delete <strong>{selectedCategory.name}</strong>{" "}
        category?
      </p>
      <div className="flex justify-end">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={() => onDelete()} variant="destructive">
          Delete
        </Button>
      </div>
    </div>
  );
};
