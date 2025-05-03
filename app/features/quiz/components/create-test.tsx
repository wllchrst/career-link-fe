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

interface Props {
  onSuccess: () => void;
  sessionId: string;
  testType: TestType;
}

export const CreateTest = ({onSuccess, testType, sessionId}: Props) => {

    const form = useForm<CreateTestInput>({
        resolver: zodResolver(createTestInputSchema),
        defaultValues: {
            title: "",
            session_id: sessionId,
            type: testType,
            open_date: new Date(),
            close_date: new Date(),
        },
    });

    const onSubmit = async (data: CreateTestInput) => {
        
        const toastId = toast.loading(`Creating ${data.type.replace('_', ' ')}...`);
        try {
          const res = await createTest({ data });
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
                  <Field control={form.control} placeholder="Enter name" label="Name" type="text" name="title"/>
                  <DatePicker onSelect={handleChangeDate} onTimeChange={handleTimeChange} name='open_date' control={form.control} label="Start Date" />
                  <DatePicker onSelect={handleChangeDate} onTimeChange={handleTimeChange} name='close_date' control={form.control} label="End Date" />
                </>
            
              <div className="flex gap-5 justify-end">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className={
                    `bg-accent ${form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`
                  }
                >
                  {form.formState.isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        );
}