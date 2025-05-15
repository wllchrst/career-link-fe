import { useForm } from "react-hook-form";
import { updateStudentData, updateStudentInputSchema, type UpdateStudentDataInput } from "../api/update-student-data";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { getErrorMessage } from "~/lib/error";
import { Form } from "~/components/ui/form";
import Field from "~/components/ui/form-field";
import { Button } from "~/components/ui/button";

interface Props {
  onSuccess: () => void;
}

const UpdateStudentData = ({onSuccess}:Props) => {

    const form = useForm<UpdateStudentDataInput>({
        resolver: zodResolver(updateStudentInputSchema),
        defaultValues: {
            name: 'william',
            email:'william@gmail.com',
            future_position: '',
            major: 'Computer Science',
            nim: '1234567890',
            password: 'william',
            phone: '081234567890',
            skill: ''
        },
      });
    
      const onSubmit = async (data: UpdateStudentDataInput) => {
        const toastId = toast.loading("Updating future plan...");
    
        try {
          const res = await updateStudentData({data})
          toast.success(res.message, { id: toastId });
    
          form.reset();
    
          onSuccess();
        } catch (error) {
          toast.error(getErrorMessage(error), {
            id: toastId,
          });
        }
      };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Field control={form.control} placeholder="Enter here" label="Future Position" type="text" name="future_position"/>
            <Field control={form.control} placeholder="Enter here" label="Skill" type="text" name="skill"/>
            
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className={
                        form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }
                >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
                </Button>
            </div>
            </form>
        </Form>
    )
}

export default UpdateStudentData