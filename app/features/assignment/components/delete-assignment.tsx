import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import type { Assignment } from "~/types/api";
import { deleteAssignment } from "../api/delete-assignment";
import { getErrorMessage } from "~/lib/error";

interface Props {
  onSuccess: () => void;
  onClose?: () => void;
  selectedCategory: Assignment;
}

export const DeleteAssignment = ({
  onSuccess,
  onClose,
  selectedCategory,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting assignment...");

    try {
      await deleteAssignment(selectedCategory.id);
      toast.success("Delete assignment success", { id: toastId });

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
        Are you sure you want to delete assignment?
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
