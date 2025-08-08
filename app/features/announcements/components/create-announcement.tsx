import { useForm } from "react-hook-form"
import { createAnnouncement, type CreateAnnouncementInput } from "../api/create-announcement"
import { AnnouncementType } from "~/types/enum"
import toast from "react-hot-toast"
import { getErrorMessage } from "~/lib/error"
import { Button } from "~/components/ui/button"
import { useState } from "react"
import Field from "~/components/ui/form-field"
import TextAreaField from "~/components/ui/text-area-field"
import FileField from "~/components/ui/file-field"
import SelectField from "~/components/ui/select-field"
import { Form } from "~/components/ui/form"


interface Props {
    onSuccess: () => void
}

export const CreateAnnouncement = ({onSuccess}:Props) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const form = useForm<CreateAnnouncementInput>({
        defaultValues: {
            title: "",
            description: "",
            type: AnnouncementType.EVENT
        }
    })

    
    const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data:CreateAnnouncementInput) => {
        const toastId = toast.loading("Creating announcement..")
        try {
            let res = await createAnnouncement({data})
            toast.success(res.message, {id: toastId})
            onSuccess()
        } catch (error) {
            toast.success(getErrorMessage(error), {id: toastId})
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <Field
                    control={form.control}
                    placeholder="Enter title"
                    label="Title"
                    type="text"
                    name="title"
                />
                <TextAreaField
                    control={form.control}
                    placeholder="Enter description"
                    label="Description"
                    name="description"
                />
                <SelectField
                    control={form.control}
                    name="type"
                    label="Type"
                    values={Object.values(AnnouncementType).map(e => ({
                        value:e,
                        text: e
                    }))}
                />
                <FileField  
                    control={form.control}
                    handlePreview={handleImagePreview}
                    label="Bootcamp Image"
                    name="image_file"
                />
                {previewUrl && (
                    <img
                    src={previewUrl}
                    alt="Preview"
                    className="mt-4 w-full max-h-32 object-cover rounded-md border"
                    />
                )}

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className={`bg-accent ${
                    form.formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                    {form.formState.isSubmitting ? "Creating..." : "Create"}
                </Button>
            </form>
        </Form>
    )
}