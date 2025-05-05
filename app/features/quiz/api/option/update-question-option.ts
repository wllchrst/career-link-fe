import { z } from "zod";
import { api } from "~/lib/api-client";

export const updateQuestionOptionSchema = z.object({
    option: z.string().min(1, 'Option is required'),
    is_answer: z.coerce.boolean(),
    question_id: z.string()
})

export type UpdateQuestionOptionInput = z.infer<typeof updateQuestionOptionSchema>;

export const updateQuestionOption = ({data, id}: {
    data: UpdateQuestionOptionInput,
    id: string
}): Promise<{ data: { id: string }; message: string }> => {
    return api.put(`bootcamp/question_option/${id}`, data);
}