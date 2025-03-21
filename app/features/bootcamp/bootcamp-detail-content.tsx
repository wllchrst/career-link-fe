import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";

const BootcampDetailContent = () => {
    return (
        <>
            <div>
                <p className={"text-primary text-3xl font-semibold ml-4 mb-8"}>Bootcamp Content</p>
                <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                    <AccordionItem value="item-1" className={"bg-white py-2 px-4 rounded-md shadow-md"}>
                        <AccordionTrigger className={"text-xl font-medium decoration-transparent text-accent"}>Session
                            1: Siapa itu Alexander the great?</AccordionTrigger>
                        <AccordionContent className={"border-t-2"}>
                            <div className={"bg-black w-4/5 h-lvh mt-4"}>

                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className={"bg-white py-2 px-4 rounded-md shadow-md"}>
                        <AccordionTrigger className={"text-xl font-medium decoration-transparent text-accent"}>Session
                            2: Sumber Alexander the great?</AccordionTrigger>
                        <AccordionContent className={"border-t-2"}>
                            <div className={"bg-black w-4/5 h-lvh mt-4"}>

                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}

export default BootcampDetailContent;