import type { HTMLProps, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface Props extends HTMLProps <HTMLDivElement> {
    children: ReactNode,
    text: string
}

const TooltipLayout = ({children, text}:Props) => {

    return (<TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>)
}

export default TooltipLayout