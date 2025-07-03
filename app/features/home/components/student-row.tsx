import { DownloadIcon } from "lucide-react";
import TooltipLayout from "~/components/layouts/tooltip-layout";
import { Button } from "~/components/ui/button";
import { TableCell, TableRow } from "~/components/ui/table";
import type { User } from "~/types/api";

interface Props {
  idx: number;
  cur: number;
  e: User;
}

const displayOrDash = (value?: string, limit = 10) => {
  if (!value || value.trim() === "") return "-";
  if (value.length <= limit) return value;
  return value.slice(0, limit) + "...";
};

const StudentRow = ({ idx, cur, e }: Props) => {
  return (
    <TableRow className="shadow-md p-5 border-box bg-white rounded-lg items-center my-2 flex w-full">
      <TableCell className="w-[3%] font-medium text-center">
        {idx + (cur - 1) * 10 + 1}
      </TableCell>

      <TableCell className="w-[12%] text-center">{e?.nim ?? "-"}</TableCell>

      <TableCell className="w-[15%] text-center whitespace-normal break-words">
        {e?.name ?? "-"}
      </TableCell>

      <TableCell className="w-[22%] text-center">
        <TooltipLayout text={e?.email ?? "no email"}>
          <p>
            {e?.email
              ? displayOrDash(e.email, e.email.indexOf("@")) + "..."
              : "-"}
          </p>
        </TooltipLayout>
      </TableCell>

      <TableCell className="w-[17%] text-center">
        {e?.phone ? e.phone.replace("+62", "0") : "-"}
      </TableCell>

      <TableCell className="w-[10%] text-center whitespace-normal break-words">
        <TooltipLayout text={e?.major ?? "no major yet"}>
          <p>{displayOrDash(e?.major)}</p>
        </TooltipLayout>
      </TableCell>

      <TableCell className="w-[11%] text-center whitespace-normal break-words">
        <TooltipLayout text={e?.future_position ?? "no future position yet"}>
          <p>{displayOrDash(e?.future_position)}</p>
        </TooltipLayout>
      </TableCell>

      <TableCell className="w-[8%] text-center whitespace-normal break-words">
        <TooltipLayout text={e?.skill ?? "no skill yet"}>
          <p>{displayOrDash(e?.skill)}</p>
        </TooltipLayout>
      </TableCell>

      <TableCell className="w-[4%] text-center whitespace-normal break-words">
        <Button>
          <DownloadIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default StudentRow;
