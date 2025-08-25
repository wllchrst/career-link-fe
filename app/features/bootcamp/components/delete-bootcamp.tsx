import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import type { Bootcamp } from "~/types/api";
import { deleteBootcamp } from "../api/delete-bootcamp";
import { getErrorMessage } from "~/lib/error";

interface Props {
  onSuccess: () => Promise<void>;
  onClose?: () => void;
  selectedCategory: Bootcamp;
}

export const DeleteBootcamp = ({
  onSuccess,
  onClose,
  selectedCategory,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting bootcamp...");

    try {
      await deleteBootcamp(selectedCategory.id);
      toast.success("Delete bootcamp success", { id: toastId });

      await onSuccess();
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p>
        Are you sure you want to delete bootcamp <strong>{selectedCategory.name}</strong>{" "}?
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
