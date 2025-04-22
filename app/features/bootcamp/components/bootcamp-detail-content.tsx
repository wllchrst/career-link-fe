import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";
import {Link} from "react-router";

const BootcampDetailContent = () => {
    return (
        <>
            <div>
                <p className={"text-primary text-3xl font-semibold ml-4 mb-8"}>Bootcamp Content</p>
                <Link to={'/'} type={'single'} className={"box-border flex items-center border-2 border-green-500 gap-x-4 bg-white p-2 rounded-md shadow-md"}>
                    <h2 className={'font-normal text-xl text-green-500 border-r-2 border-green-500 p-6 h-full flex justify-center items-center aspect-square'}>1</h2>
                    <h2 className={'font-normal text-xl text-green-500 p-6 h-full '}>Introduction to HTML CSS JS</h2>
                </Link>
            </div>
        </>
    )
}

export default BootcampDetailContent;