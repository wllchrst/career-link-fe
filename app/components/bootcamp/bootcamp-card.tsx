import { BootcampMethodTag } from "./bootcamp-method-tag"
import { BootcampTypeTag } from "./bootcamp-type-tag"
import {NavLink} from "react-router";

export const BootcampCard = () => {
    return (
        <div className="flex flex-col w-84 bg-white shadow rounded-md">
            <img src="https://www.teacheracademy.eu/wp-content/uploads/2021/10/successful-teacher-1.jpg" alt="" className="h-55 rounded-t-md"/>
            <div className="flex flex-col p-3 gap-1">
                <div className="text-lg">[Bootcamp Name]</div>
                <div className="flex gap-2">
                    <BootcampTypeTag type="Hard Skill" />
                    <BootcampMethodTag type="Self Learning" />
                </div>
                <div className="text-xs text-justify my-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</div>
                <NavLink to={"/bootcamps/1"} className="flex justify-end">
                    <div className="bg-accent text-white rounded-md text-center w-30 p-2 text-sm mt-2">See Details</div>
                </NavLink>
            </div>
        </div>
    )
}