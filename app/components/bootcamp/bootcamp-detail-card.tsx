import {BootcampMethodTag} from "~/components/bootcamp/bootcamp-method-tag";
import { BootcampTypeTag } from "./bootcamp-type-tag";
import {Button} from "~/components/ui/button";

const BootcampDetailCard = () => {
    return (
        <>
            <div className={"flex bg-white p-6 rounded-xl gap-16"}>
                <div className={"flex flex-col gap-2 justify-center"}>
                    <p className={"text-primary text-3xl font-semibold"}>Frontend Development using Svelte</p>
                    <div className="flex gap-2">
                        <BootcampTypeTag type="Hard Skill" />
                        <BootcampMethodTag type={"Self Learning"}/>
                    </div>
                    <p className={"text-justify"}>Frontend Development using Svelte is a contemporary approach to building user interfaces that are efficient, reactive, and lightweight. Svelte is a JavaScript framework that differs from others like React or Vue because it doesn’t use a virtual DOM. Instead, Svelte compiles components into pure JavaScript at build time, resulting in faster runtime performance and smaller bundle sizes. With its simple and intuitive syntax, developers can write less code to achieve complex functionality. This makes Svelte ideal for both beginners learning frontend development and professionals aiming to improve project efficiency. Svelte also supports reactive statements and stores for elegant state management. With easy integration and a growing ecosystem, Svelte has become a popular choice in modern web development. This framework helps create applications that are fast, responsive, and maintainable in the long term.</p>
                    <Button className={"mt-7 py-6 bg-accent font-normal"}>Enroll Now</Button>
                </div>
                <img src="https://www.teacheracademy.eu/wp-content/uploads/2021/10/successful-teacher-1.jpg" alt=""
                     className="w-lg rounded-lg"/>
            </div>
        </>
    )
}

export default BootcampDetailCard