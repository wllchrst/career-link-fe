import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { getErrorMessage } from "~/lib/error";
import type { BootcampType } from "~/types/api";
import { deleteBootcampType } from "../api/delete-bootcamp-type";

interface Props {
  onSuccess: () => void;
  onClose?: () => void;
  selectedBootcampType: BootcampType;
}

export const DeleteBootcampType = ({
  onSuccess,
  onClose,
  selectedBootcampType,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting category...");

    try {
      await deleteBootcampType(selectedBootcampType.id);
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
        Are you sure you want to delete{" "}
        <strong>{selectedBootcampType.name}</strong> category?
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
