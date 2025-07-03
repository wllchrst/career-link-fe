import { zodResolver } from "@hookform/resolvers/zod";
import { createAssignment, createAssignmentInputSchema, type CreateAssignmentInput } from "../api/create-assignment";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import FileField from "~/components/ui/file-field";
import Field from "~/components/ui/form-field";
import DatePicker from "~/components/ui/date-picker";
import type { Assignment } from "~/types/api";

interface Props {
  onSuccess: () => void;
  sessionId: string;
  assignment?: Assignment;
}

const CreateAssignment = ( {sessionId, assignment, onSuccess}:Props ) => {
    const form = useForm<CreateAssignmentInput>({
        resolver: zodResolver(createAssignmentInputSchema),
        defaultValues: {
            session_id: sessionId,
            answer_file_path:  assignment? assignment.answer_file_path : "",
            question_file_path: assignment? assignment.question_file_path :  "",
            is_shared:  assignment? assignment.is_shared : false,
            open_date: assignment? new Date(assignment.open_date) : new Date(),
            close_date:  assignment? new Date(assignment.close_date) : new Date(),
        },
      });
    
      const onSubmit = async (data: CreateAssignmentInput) => {
        const toastId = toast.loading("Creating assignment...");
        try {
          const res = await createAssignment({ data, id: assignment?.id });
          toast.success(res.message, { id: toastId });
          form.reset();
          onSuccess();
        } catch (error) {
          toast.error(getErrorMessage(error), {
            id: toastId,
          });
        }
      };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, name:"question_file_path"|"answer_file_path") => {
      const file = e.target.files?.[0];
      if (file) {
          form.setValue(name, file.name);
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
            <FileField control={form.control} handlePreview={(e) => {handleFile(e, "question_file_path")}} label="Question File" name="question_file"/>
            <FileField control={form.control} handlePreview={(e) => {handleFile(e, "answer_file_path")}} label="Answer File" name="answer_file"/>
            <Field
                control={form.control}
                name="is_shared"
                type="checkbox"
                label="Shared"
            />
            <DatePicker onSelect={handleChangeDate} onTimeChange={handleTimeChange} name='open_date' control={form.control} label="Open Date" />
            <DatePicker onSelect={handleChangeDate} onTimeChange={handleTimeChange} name='close_date' control={form.control} label="Close Date" />
            <div className="flex gap-5 justify-end">
            <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className={`bg-accent ${
                form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
            </div>
        </form>
        </Form>

    )
}

export default CreateAssignment