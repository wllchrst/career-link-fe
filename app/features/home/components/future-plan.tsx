import { MdEdit } from "react-icons/md"

const FuturePlan = () => {
    return (
        <div className="flex flex-col gap-5 bg-white shadow p-10 rounded-md">
            <div className="flex justify-between">
                <div className="text-2xl text-primary font-semibold">Position</div>
                <MdEdit className="text-primary text-3xl"/>
            </div>
            <div className="text-md">Application Developer</div>
            <hr className="border-t border-gray-300 m-4" />
            <div className="flex justify-between">
                <div className="text-2xl text-primary font-semibold">Skill</div>
            </div>
            <div className="text-md">C, C++, Java, Golang, Rust, R, Python, Javascript</div>
        </div>  
    )
}

export default FuturePlan