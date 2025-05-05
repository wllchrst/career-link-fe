import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import type { Bootcamp, SessionTest } from "~/types/api";
import { deleteSessionTest } from "../api/delete-test";
import { getErrorMessage } from "~/lib/error";

interface Props {
  onSuccess: () => void;
  onClose?: () => void;
  selectedCategory: SessionTest;
}

export const DeleteTest = ({
  onSuccess,
  onClose,
  selectedCategory,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting test...");

    try {
      await deleteSessionTest(selectedCategory.id);
      toast.success("Delete test success", { id: toastId });

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
        Are you sure you want to delete test <strong>{selectedCategory.title}</strong>{" "}?
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
