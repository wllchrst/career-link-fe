import { z } from "zod";
import { api } from "~/lib/api-client";

export const createQuestionOptionSchema = z.object({
    option: z.string().min(1, 'Option is required'),
    is_answer: z.boolean(),
    question_id: z.string()
})

export type CreateQuestionOptionInput = z.infer<typeof createQuestionOptionSchema>;


export const createQuestionOption = ({data,}: {
    data: CreateQuestionOptionInput
}): Promise<{ data: { id: string }; message: string }> => {
    return api.post('bootcamp/question_option', data);
}