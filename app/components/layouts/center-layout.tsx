import type {HTMLProps, ReactNode} from "react";

interface Props extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

export default function CenterLayout({children}:Props) {

    return (
        <div className={"flex items-center justify-center p-5"}>{children}</div>
    )
}