import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import type { Question, Session } from "~/types/api";
import { getErrorMessage } from "~/lib/error";
import { deleteSession } from "../api/delete-session";

interface Props {
  onSuccess: () => void;
  onClose?: () => void;
  question?: Session;
}

export const DeleteSession = ({
  onSuccess,
  onClose,
  question
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting session...");

    try {
        if (question) await deleteSession({id: question.id});
        toast.success("Delete session success", { id: toastId });
        
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
        Are you sure you want to delete session <strong>{question?.title}</strong>{" "}?
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
