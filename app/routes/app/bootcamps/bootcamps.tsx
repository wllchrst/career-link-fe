import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { BootcampsCarousel } from "~/features/bootcamp/components/bootcamps-carousel";
import { BootcampsGrid } from "~/features/bootcamp/components/bootcamps-grid";
import type { Route } from "./+types/bootcamps";
import { getBootcamps } from "~/features/bootcamp/api/get-bootcamps";
import { getBootcampTypes } from "~/features/bootcamp-type/api/get-bootcamp-types";
import { getBootcampCategories } from "~/features/bootcamp-category/api/get-bootcamp-categories";
import { useEffect, useState } from "react";
import type { Bootcamp } from "~/types/api";
import { getEnrollmentByUser } from "~/features/enrollments/api/get-enrollment-by-user";
import { useAuth } from "~/lib/auth";
import EmptyMessage from "~/components/ui/empty-message";


const Bootcamps = () => {

  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([])
  const {user} = useAuth()
  

  useEffect(() => {
    console.log(user)
    getEnrollmentByUser(user?.id!).then(e => setBootcamps(e.data.map(enrollment => enrollment.bootcamp))).catch(console.log)
  }, [user])

  if (!user){
    return <div className="flex flex-col items-center justify-center">
        <EmptyMessage text="You are prohibited to access this page. Please login first!" title="Unauthorized"/>
        <a href="/career-link/">Login here</a>
    </div>
  }

  return (
    <div className="container flex flex-col gap-6">
      {
        bootcamps.length > 4 && 
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl text-primary font-bold">
            Learners are Viewing
          </h1>
          <BootcampsCarousel bootcamps={bootcamps} />
        </div>
      }
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl text-primary font-bold">
          Learn Fast, Grow Faster
        </h1>
        <div>
          Master essential hard and soft skills through our comprehensive
          training programs, accessible anytime, anywhere
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="mt-4 flex gap-5">
            <div className="flex items-center border bg-white px-3 py-2 rounded-md w-120">
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
        <BootcampsGrid bootcamps={bootcamps} />
      </div>
    </div>
  );
};

export default Bootcamps;
