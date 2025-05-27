import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import Field from "~/components/ui/form-field";
import { createTest, createTestInputSchema, type CreateTestInput } from "../api/create-test";
import { TestType } from "~/types/enum";
import DatePicker from "~/components/ui/date-picker";
import type { SessionTest } from "~/types/api";
import { updateTest } from "../api/update-test";

interface Props {
  onSuccess: () => void;
  sessionId: string;
  testType: TestType;
  test?: SessionTest | undefined;
}

export const CreateUpdateTest = ({onSuccess, testType, sessionId, test}: Props) => {

    const form = useForm<CreateTestInput>({
        resolver: zodResolver(createTestInputSchema),
        defaultValues: {
            title:  test? test.title:"",
            session_id: sessionId,
            type: test? test.type:testType,
            open_date: test? new Date(test.open_date):new Date(),
            close_date: test? new Date(test.close_date):new Date(),
            attempt_count: test? test.attempt_count: "0",
        },
    });

    const onSubmit = async (data: CreateTestInput) => {
        
        const toastId = toast.loading(`${test?"Updating":"Creating"} ${data.type.replace('_', ' ')}...`);
        try {
          const res = test?await updateTest({ data, id:test.id }): await createTest({ data });
          toast.success(res.message, { id: toastId });
          form.reset();
          onSuccess();
        } catch (error) {
          toast.error(getErrorMessage(error), {
            id: toastId,
          });
        }
      };

      function handleChangeDate(name:string, date: Date | undefined) {
        const realName = name as "close_date"|"open_date"
          if (date) {
            form.setValue(realName, date);
          }
        }
      
      function handleTimeChange(name:string,type: "hour" | "minute", value: string) {
        const realName = name as "open_date"|"close_date"
        const currentDate = form.getValues(realName) || new Date();
        let newDate = new Date(currentDate);
    
        if (type === "hour") {
          const hour = parseInt(value, 10);
          newDate.setHours(hour);
        } else if (type === "minute") {
          newDate.setMinutes(parseInt(value, 10));
        }
    
        form.setValue(realName, newDate);
      }

      return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <>
                  <Field control={form.control} placeholder="Enter title" label="Title" type="text" name="title"/>
                  <DatePicker onSelect={handleChangeDate} onTimeChange={handleTimeChange} name='open_date' control={form.control} label="Start Date" />
                  <DatePicker onSelect={handleChangeDate} onTimeChange={handleTimeChange} name='close_date' control={form.control} label="End Date" />
                  <Field control={form.control} placeholder="Enter attempt count" label="Attempt Count" type="number" name="attempt_count" />
                </>
            
              <div className="flex gap-5 justify-end">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className={
                    `bg-accent ${form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`
                  }
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        );
}