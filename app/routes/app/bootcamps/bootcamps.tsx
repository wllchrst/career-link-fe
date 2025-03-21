import { BootcampCard } from "~/components/bootcamp/bootcamp-card";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Bootcamps = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <div className="text-2xl font-semibold">Learners are Viewing</div>
                <div className="relative">
                    <button className="absolute left-[-1vw] top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowLeft />
                    </button>
        
                    <div className="flex gap-6 overflow-x-hidden">
                        <BootcampCard/>
                        <BootcampCard/>
                        <BootcampCard/>
                    </div>
        
                    <button className="absolute right-[-1vw] top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-accent text-white rounded-full shadow-md">
                        <FaArrowRight />
                    </button>
    </div>
            </div>
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
        </div>
    )
}

export default Bootcamps