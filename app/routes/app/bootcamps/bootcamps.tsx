import { BootcampCard } from "~/components/bootcamp/bootcamp-card"
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";

const Bootcamps = () => {
    return (
        <div className="flex flex-col">
            <div className="text-2xl font-semibold">Learn Fast, Grow Faster</div>
            <div>Master essential hard and soft skills through our comprehensive training programs, accessible anytime, anywhere</div>
            <div className="flex justify-between items-center">
                <div className="mt-4 flex gap-5">
                <div className="flex items-center bg-white px-3 py-2 rounded-md w-120">
                    <CiSearch className="text-gray-500 text-xl" />
                    <input
                    type="text"
                    placeholder="Search by Name, Skill Type or Learning Mode"
                    className="bg-transparent outline-none px-2 py-1 text-gray-600 w-full"
                    />
                </div>
                <button className="bg-accent text-white px-4 py-2 rounded-md">
                    Search
                </button>
                </div>
                <div className="flex text-accent border border-accent bg-white items-center h-12 rounded-md gap-2 p-3">
                    <FaFilter />
                    <div>Filter</div>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-6">
                <BootcampCard/>
                <BootcampCard/>
                <BootcampCard/>
                <BootcampCard/>
            </div>
        </div>
    )
}

export default Bootcamps