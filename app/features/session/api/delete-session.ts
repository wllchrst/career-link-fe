import { api } from "~/lib/api-client";

export const deleteSession = ({
    id
}: {
 id: string
}): Promise<{ data: { id: string }; message: string }> => {

  return api.delete(`/bootcamp/session/${id}`);
};
