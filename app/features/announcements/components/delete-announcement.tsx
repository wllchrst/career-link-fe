import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { deleteAnnouncement } from "../api/delete-announcement";
import { useState } from "react";
import { getErrorMessage } from "~/lib/error";
import type { Announcement } from "~/types/api";

interface Props {
    onSuccess: () => void,
    announcement: Announcement,
    onClose: () => void
}

export const DeleteAnnouncement = ({onSuccess, onClose, announcement}:Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting announcement...");

    try {
        await deleteAnnouncement({id: announcement.id});
        toast.success("Delete announcement success", { id: toastId });

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
            Are you sure you want to delete announcement <strong>{announcement.title}</strong>{" "}?
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
}