import { z } from "zod";
import { api } from "~/lib/api-client";
import { AnnouncementType } from "~/types/enum";

export const updateAnnouncementInputSchema = z.object({
    title: z.string().min(1, "title cant be empty"),
    description: z.string().min(1, "description cant be empty"),
    image_file: z.instanceof(File),
    type: z.nativeEnum(AnnouncementType)
})

export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementInputSchema>

export const updateAnnouncement = ({
  data,
  id
}: {
  data: UpdateAnnouncementInput;
  id: string;
}): Promise<{ data: { id: string }; message: string }> => {
  let formData = new FormData();

  for (let key in data) {
    const value = data[key as keyof UpdateAnnouncementInput];

    if (value !== undefined) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  }

  return api.post(`/announcement/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};