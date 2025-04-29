import type { HTMLProps, ReactNode } from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

interface Props extends HTMLProps<HTMLDivElement> {
    columns: string[];
    children: ReactNode;

}

export default function TableLayout<T>({columns, children}:Props) {

    return (
        <Table className="my-5 border border rounded-mdha">
            <TableHeader className="bg-slate-600">
                <TableRow>
                    {columns.map(e => <TableHead className="text-center text-white">{e}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    )
}