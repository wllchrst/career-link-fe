import type { HTMLProps, ReactNode } from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

interface Props extends HTMLProps<HTMLDivElement> {
    header: ReactNode;
    children: ReactNode;
}

export default function TableLayout({header, children}:Props) {

    

    return (
        <Table className="mt-5">
            {header}
            <TableBody className="grid">
                {children}
            </TableBody>
        </Table>
    )
}