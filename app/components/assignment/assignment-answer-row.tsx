import { Download } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";
import { useForm } from "react-hook-form";
import { createAssignmentResult, createAssignmentResultInputSchema, type CreateAssignmentResultInput } from "~/features/assignment/api/result/create-assignment-result";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AssignmentResult, User } from "~/types/api";
import { AssignmentResultType } from "~/types/enum";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { updateAssignmentAnswer } from "~/features/assignment/api/answer/update-assignment-answer";
import { updateAssignmentResult } from "~/features/assignment/api/result/update-assignment-result";
import { useRevalidator } from "react-router";

interface Props {
    assignment_id: string;
    user: User;
    answerFilePath?: string;
    result?: AssignmentResult;
}

const AssignmentAnswerRow = ({assignment_id, user,answerFilePath, result}: Props) => {
    const revalidator = useRevalidator();

    const form = useForm<CreateAssignmentResultInput>({
            resolver: zodResolver(createAssignmentResultInputSchema),
            defaultValues: {
                assignment_id: assignment_id,
                user_id: user.id,
            },
        });

    const onSubmit = async (e:React.ChangeEvent<HTMLSelectElement>) => {
        const toastId = toast.loading("Saving grade...");
        const selected = e.target.value as AssignmentResultType;
        form.setValue("result", selected);

        if (selected === AssignmentResultType.NO_FILE) {
            toast.error("Cannot grade without a file", {
                id: toastId,
            });
            return
        } 

        try {
            console.log(result)
            const res =result ? 
            await updateAssignmentResult({
                data: {
                    ...form.getValues(),
                },
                id: result.id,
            })
            : 
            await createAssignmentResult({
                data: {
                    ...form.getValues(),
                },
            })
            toast.success(res.message, { id: toastId });
            revalidator.revalidate();
            form.reset();
        } catch (error) {
            toast.error(getErrorMessage(error), {
                id: toastId,
            });
        }
    }

    return (
        <TableRow className="flex w-full border-b-1 border-gray-200">
            <TableCell className="w-1/4 text-center">{user.nim ?? "-"}</TableCell>
            <TableCell className="w-1/4 text-center">{user.name}</TableCell>
            <TableCell className="w-1/4 text-center flex justify-center">
                {
                    answerFilePath ? 
                    <a href={`${import.meta.env.VITE_STORAGE_URL}/${answerFilePath}`}>
                    <Download />
                    </a> : 
                    <span className="text-gray-500">No answer submitted</span>
                }
            </TableCell>
            <TableCell className="w-1/4 text-center">
                <select onChange={onSubmit}>
                    { Object.values(AssignmentResultType).map((key) => <option key={key} value={key} selected={
                        result? result.result === key : key == AssignmentResultType.NO_FILE
                    }>{key.replace('_', ' ')}</option>) }
                </select>
            </TableCell>
        </TableRow>
    )

}   

export default AssignmentAnswerRow;

