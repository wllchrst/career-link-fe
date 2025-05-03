import type { HTMLProps, ReactNode } from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

interface Props extends HTMLProps<HTMLDivElement> {
    columns: string[];
    children: ReactNode;

}

export default function TableLayout({columns, children}:Props) {

    return (
        <Table className="mt-5 border-spacing-y-5 border-separate">
            <TableHeader className="">
                <TableRow>
                    {columns.map(e => <TableHead className="text-center text-black text-lg font-medium">{e}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {children}
            </TableBody>
        </Table>
    )
}