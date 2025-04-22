import type {HTMLProps, ReactNode} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";

interface Props extends HTMLProps<HTMLDivElement> {
    text: string;
    isLocked: boolean | undefined;
    children: ReactNode;
}

export default function AccordionLayout({text, isLocked,children}:Props) {

    return (
        <Accordion type={'single'} className={`${isLocked?'bg-gray-600/80':'bg-white'} w-full shadow-md rounded-md`} collapsible>
            <AccordionItem value={text}>
                <AccordionTrigger className={'flex items-center py-6 px-6 justify-between w-full no-underline hover:no-underline focus:no-underline hover:bg-gray-300/50'}>
                    <h2 className={`font-medium text-xl ${isLocked?'text-black/60':'text-slate-500'}`}>{text}</h2>
                </AccordionTrigger>
                {!isLocked &&
                    <AccordionContent className={'border-t border-gray-300/80 px-6 py-6 flex flex-col gap-y-4'}>
                        {children}
                    </AccordionContent>
                }
            </AccordionItem>
        </Accordion>
    )
}