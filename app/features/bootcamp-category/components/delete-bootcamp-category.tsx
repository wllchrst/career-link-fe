import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import type { BootcampCategory } from "~/types/api";
import { deleteBootcampCategory } from "../api/delete-bootcamp-category";
import { getErrorMessage } from "~/lib/error";

interface Props {
  onSuccess: () => void;
  onClose?: () => void;
  selectedCategory: BootcampCategory;
}

export const DeleteBootcampCategory = ({
  onSuccess,
  onClose,
  selectedCategory,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting category...");

    try {
      await deleteBootcampCategory(selectedCategory.id);
      toast.success("Delete category success", { id: toastId });

      onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p>
        Are you sure you want to delete <strong>{selectedCategory.name}</strong>{" "}
        category?
      </p>
      <div className="flex justify-end gap-2">
        <Button onClick={onClose} variant="outline" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={onDelete} variant="destructive" disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};
