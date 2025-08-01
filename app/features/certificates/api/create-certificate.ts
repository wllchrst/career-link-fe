import { z } from "zod";
import { api } from "~/lib/api-client";
import { CertificateType } from "~/types/enum";

export const CreateCertificateInputSchema = z.object({
    type: z.nativeEnum(CertificateType),
    bootcamp_id: z.string(),
    user_id: z.string(),
})

export type CreateCertificateInput = z.infer<typeof CreateCertificateInputSchema>

export const createCertificate = ({
  data,
}: {
  data: CreateCertificateInput;
}): Promise<{ data: { id: string }; message: string }> => {
  return api.post("bootcamp/certificate", data);
};  