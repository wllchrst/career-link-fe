import {FaArrowLeft} from "react-icons/fa";
import {Link} from "react-router";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";
import AccordionLayout from "~/components/layouts/accordion-layout";

const Session = () => {

    return <div className={'flex flex-col w-full gap-y-4'}>
        <div className={'w-full flex items-center'}>
            <Link to={"/"}>
                <button
                    className="w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                    <FaArrowLeft/>
                </button>
            </Link>
            <h2 className={'font-bold text-left w-full text-4xl text-slate-700 p-6 h-full'}>Frontend Development using Svelte</h2>
        </div>
        <div className={"bg-white w-full h-50 shadow-md h-auto rounded-lg flex flex-col gap-y-5 p-6"}>
            <h2 className={'text-slate-700 text-2xl font-semibold'}>Introduction to HTML CSS JS</h2>
            <p className={'text-justify text-sm'}>Introduction to HTML, CSS, and JavaScript is the foundational step for anyone looking to dive into web development. These three core technologies work together to build the structure, style, and behavior of websites. HTML (HyperText Markup Language) provides the basic structure of web pages. It defines elements like headings, paragraphs, links, images, and forms. Without HTML, there would be no content to display on the web.

                CSS (Cascading Style Sheets) is responsible for styling that content—controlling layout, colors, fonts, spacing, and overall visual presentation. CSS allows developers to make websites visually appealing and responsive across different devices and screen sizes.

                JavaScript (JS) adds interactivity and dynamic behavior to web pages. It enables actions like form validation, content updates without refreshing the page (AJAX), animations, and more. JavaScript can also be used in combination with various libraries and frameworks like React or Vue to build complex web applications.

                Understanding how these technologies work together is essential for any aspiring web developer. They form the backbone of the internet and are supported by all major browsers. Mastery of HTML, CSS, and JavaScript not only unlocks the ability to create websites but also provides a strong foundation for learning more advanced development tools and techniques.</p>
        </div>
        <h2 className={'font-semibold text-left text-4xl text-slate-700 py-6 w-full h-full'}>To Do List</h2>

        <div className={'flex flex-col gap-y-6'}>
            <AccordionLayout text={'Pretest'}>
                here pretest
            </AccordionLayout>
            <AccordionLayout text={'Material'}>
                here material
            </AccordionLayout>
            <AccordionLayout text={'Post Test'}>
                here post test
            </AccordionLayout>
        </div>
    </div>
}

export default Session