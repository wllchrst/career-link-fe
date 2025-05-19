import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import type { Question } from "~/types/api";
import { getErrorMessage } from "~/lib/error";
import { deleteQuestion } from "../api/question/delete-test-question";

interface Props {
  onSuccess: () => void;
  onClose?: () => void;
  questions: Question[];
}

export const DeleteAllQuestion = ({
  onSuccess,
  onClose,
  questions
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting question...");

    try {
        await Promise.all(questions.map(async e => await deleteQuestion(e.id)))
        toast.success("Delete question success", { id: toastId });
        
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
        Are you sure you want to delete all questions?
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
