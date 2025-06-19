import { z } from "zod";
import { api } from "~/lib/api-client";

export const createNotificationInputSchema = z.object({
    text: z.string().min(1, "notification text cant be empty"),
    user_id: z.string().min(1, "user id cant be empty"),
})

export type CreateNotificationInput = z.infer<typeof createNotificationInputSchema>;

export function createNotification({data}:{data:CreateNotificationInput}): Promise<{ data: { id: string }; message: string }>  {
    return api.post(`notification`, data)
}