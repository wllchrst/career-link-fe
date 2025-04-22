import type {HTMLProps, ReactNode} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

interface Props extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

export default function TableLayout() {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Attempt</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>Finished</TableCell>
                    <TableCell>1 minutes 22 seconds</TableCell>
                    <TableCell className="text-center">95.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}