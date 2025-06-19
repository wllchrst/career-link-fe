import { z } from "zod";
import { api } from "~/lib/api-client";
import { TestType } from "~/types/enum";

export const createTestInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  open_date: z.date(),
  close_date: z.date(),
  type: z.nativeEnum(TestType),
  session_id: z.string().min(1, "Session id is required"),
  minimum_score: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  attempt_count: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
}).refine((data) => {
  if (data.close_date.getTime() < data.open_date.getTime()) {
    return false;
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["close_date"],
});;

export type CreateTestInput = z.infer<typeof createTestInputSchema>;

export const createTest = ({
  data,
}: {
  data: CreateTestInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/session_test", data);
};
