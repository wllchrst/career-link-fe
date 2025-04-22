import type {HTMLProps, ReactNode} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";

interface Props extends HTMLProps<HTMLDivElement> {
    text: string;
    children: ReactNode;
}

export default function AccordionLayout({text,children}:Props) {

    return (
        <Accordion type={'single'} className={'bg-white w-full py-3 px-6 shadow-md rounded-md'} collapsible>
            <AccordionItem value={text}>
                <AccordionTrigger className={'flex items-center justify-between w-full'}>
                    <h2 className={'font-medium text-xl text-slate-500'}>{text}</h2>
                </AccordionTrigger>
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}