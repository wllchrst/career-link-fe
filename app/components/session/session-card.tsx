import { FaArrowLeft } from "react-icons/fa"
import { Link, useRevalidator } from "react-router"
import type { Session } from "~/types/api"
import { Button } from "../ui/button"
import { useRole } from "~/provider/role-testing-provider"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import {updateSession, type  UpdateSessionInput, updateSessionInputSchema } from "~/features/session/api/update-session"
import { zodResolver } from "@hookform/resolvers/zod"
import DatePicker from "../ui/date-picker"
import Field from "../ui/form-field"
import toast from "react-hot-toast"
import { getErrorMessage } from "~/lib/error"
import { formatDate } from "date-fns"

type Props = {
    session: Session,
}

const SessionCard = ({session}:Props) => {

    const revalidator = useRevalidator()

    const form = useForm<UpdateSessionInput>({
        resolver: zodResolver(updateSessionInputSchema),
        defaultValues: {
          title: session.title,
          description: session.description,
          session_number: ""+session.session_number,
          bootcamp_id: session.bootcamp.id,
          start_attendance_date: session.start_attendance_date,
          duration: session.duration
        },
      })

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

    const {role} = useRole()

    const onSubmit = async (data: UpdateSessionInput) => {
        
        const toastId = toast.loading(`Updating...`);
        try {
            const res = await updateSession({data, id: session.id})
            toast.success(res.message, { id: toastId });
            form.reset();
            revalidator.revalidate();
        } catch (error) {
            toast.error(getErrorMessage(error), {
                id: toastId,
            });
        }
    }

    return (
        <>
            <div className={'w-full flex items-center'}>
                <Link to={`/bootcamps/${session.bootcamp.id}`}>
                    <button
                        className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft/>
                    </button>
                </Link>
                <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>{session.bootcamp.name}</h2>
            </div>  
            <div className={"bg-white w-full h-50 shadow-md h-auto rounded-lg flex flex-col gap-y-5 p-6"}>
                <h2 className={'text-slate-700 text-2xl font-semibold'}>{session.session_number}. {session.title}</h2>
                <p className={'text-justify text-sm'}>{session.description}</p>
                {
                    role =='user' && <>
                    {
                    new Date().getTime() < new Date(session.start_attendance_date).getTime() && 
                    <p className="text-md font-bold text-red-500">
                        Absent start at {formatDate(new Date(session.start_attendance_date), 'MM/dd/yyyy hh:mm a')}
                    </p>
                    }
                    {
                        (
                            new Date().getTime() >= new Date(session.start_attendance_date).getTime() && 
                            new Date().getTime() <= new Date(session.start_attendance_date).getTime() + 60000 * parseInt(session.duration)
                        ) &&
                        <p className="text-md font-bold text-green-500">
                            Absent ended at {formatDate(new Date(session.start_attendance_date).getTime() + 60000 * parseInt(session.duration), 'MM/dd/yyyy hh:mm a')}
                        </p> 
                    }
                    {
                        new Date().getTime() > new Date(session.start_attendance_date).getTime() + 60000 * parseInt(session.duration) &&
                        <p className="text-md font-bold text-red-500">
                            Absent already ended
                        </p>
                    }
                    </>
                }
                {
                    role != 'user' && <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5 w-1/3 items-end">
                                <DatePicker onSelect={handleChangeDate} onTimeChange={handleTimeChange} name='start_attendance_date' control={form.control} label="End Date" />
                                <Field control={form.control} placeholder="Enter duration" label="Duration" type="number" name="duration" />
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
                    </>
                }
            </div>
        </>
    )
}

export default SessionCard