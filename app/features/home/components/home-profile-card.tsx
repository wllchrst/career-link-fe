import { EnrichmentTrack } from "~/components/home/enrichment-track"
import { AiOutlineUpload } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useRole } from "~/role-testing-provider";
import FuturePlan from "./future-plan";

export const HomeProfileCard = () => {
    const { role } = useRole();

    return (
        <div className="mt-5 flex flex-col gap-7">
            <div className="flex gap-10 bg-white shadow p-10 rounded-md items-center">
                <img src="https://i.pinimg.com/280x280_RS/4d/3d/5d/4d3d5dbfdae11f199d158de3bb7ada35.jpg" alt="" className="w-52 h-52 rounded-full"/>
                <div className="flex flex-col">
                    <div className="text-3xl text-primary font-semibold">Daniel Adamlu</div>
                    <div className="text-xl">2602105046</div>
                    <div className="mt-2 flex gap-5">
                        <EnrichmentTrack/>
                        <EnrichmentTrack/>
                    </div>
                    <div className="flex justify-between items-center gap-3 mt-5">
                        {role == "admin" && (
                            <div className="text-accent border border-accent bg-white items-center h-12 rounded-md p-3">Sync Data</div>
                        )}
                        <div className="bg-accent text-white rounded-md p-3 flex justify-center items-center gap-2 flex-1">
                            <AiOutlineUpload/>
                            <div>Upload CV</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex px-7 justify-between items-center">
                <div className="text-3xl text-primary font-semibold">My Experiences</div>
                {role == "user" && (
                    <div className="bg-accent text-white text-3xl p-3 rounded-md">
                        <IoMdAdd />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-5 bg-white shadow p-10 rounded-md">
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="text-2xl text-primary font-semibold">1st Semester</div>
                        <MdEdit className="text-primary text-3xl"/>
                    </div>
                    <div className="text-xl">Study Abroad - Tokyo University, Japan</div>
                    <div className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                </div>
                <hr className="border-t border-gray-300 m-4" />
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="text-2xl text-primary font-semibold">2nd Semester</div>
                        <MdEdit className="text-primary text-3xl"/>
                    </div>
                    <div className="text-xl">Internship - Blibli (PT Global Niaga)</div>
                    <div className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                </div>
            </div>
            <div className="px-7 text-3xl text-primary font-semibold">My Future Plan</div>
            <FuturePlan />

            <div className="px-7 text-3xl text-primary font-semibold">My Thesis</div>
            <div className="flex flex-col gap-3 bg-white shadow p-10 rounded-md">
                <div className="flex flex-col">
                    <div className="text-2xl text-primary font-semibold">[Judul Skripsi]</div>
                    <div className="text-xl">[Thesis Title]</div>
                </div>
                <div className="text-lg">
                <div className="grid grid-cols-[0.15fr_auto_1fr] gap-x-2 gap-y-1">
                        <span>Topic</span>
                        <span>:</span>
                        <span>[topic]</span>

                        <span>Track</span>
                        <span>:</span>
                        <span>[track]</span>

                        <span>Supervisor</span>
                        <span>:</span>
                        <span>[supervisor]</span>

                        <span>Member</span>
                        <span>:</span>
                        <span>[NIM] - [Name]</span>
                    </div>
                </div>
                <div className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </div>
            </div>
        </div>
    )
}