import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import Field from "~/components/ui/form-field";
import TextAreaField from "~/components/ui/text-area-field";
import type { Bootcamp, Session } from "~/types/api";
import {
  createSession,
  createSessionInputSchema,
  type CreateSessionInput,
} from "../api/create-session";
import DatePicker from "~/components/ui/date-picker";
import { updateSession } from "../api/update-session";

interface Props {
  onSuccess: () => void;
  bootcamp: Bootcamp;
  session?: Session;
}

export const CreateUpdateSession = ({ onSuccess, session, bootcamp }: Props) => {
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionInputSchema),
    defaultValues: {
      title: session? session.title:"",
      description: session? session.description:"",
      session_number: session? ""+session.session_number:"1",
      bootcamp_id: bootcamp.id,
    },
  });

  const onSubmit = async (data: CreateSessionInput) => {
    const toastId = toast.loading(`${session?"Updating":"Creating"} session...`);
    try {
      const res = !session? await createSession({ data }):await updateSession({ data, id: session.id });
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
          const realName = name as "start_attendance_date"
            if (date) {
              form.setValue(realName, date);
            }
          }
        
    function handleTimeChange(name:string,type: "hour" | "minute", value: string) {
      const realName = name as "start_attendance_date"
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
        <Field
          control={form.control}
          placeholder="Enter name"
          label="Name"
          type="text"
          name="title"
        />
        <TextAreaField
          control={form.control}
          placeholder="Enter description"
          label="Description"
          name="description"
        />
        <Field
          control={form.control}
          placeholder="Enter session number"
          label="Session number"
          type="number"
          name="session_number"
        />
        <DatePicker 
          onSelect={handleChangeDate} 
          onTimeChange={handleTimeChange} 
          name='start_attendance_date' 
          control={form.control} 
          label="End Date" 
        />
        <Field 
          control={form.control} 
          placeholder="Enter duration" 
          label="Duration" 
          type="number" 
          name="duration" 
        />

        <div className="flex gap-10 justify-end">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={
              form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
