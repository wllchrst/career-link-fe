import HomeAdmin from "~/features/home/components/home-admin";
import { HomeProfileCard } from "~/features/home/components/home-profile-card";
import { useRole } from "~/provider/role-testing-provider";
import type { Route } from "./+types/home";
import { getUsers } from "~/features/home/api/get-student-data";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "~/lib/auth";
import type { User } from "~/types/api";
import EmptyMessage from "~/components/ui/empty-message";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async ({request}:{request:Request}) => {
    
    const url = new URL(request.url); 
    return {url}
};


export default function Home({loaderData}: Route.ComponentProps) {
  
  const { role } = useRole();
  const {user} = useAuth();
  const navigate = useNavigate()


  const {url} = loaderData
  
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const [ students, setStudents ] = useState<User[]>([])
  const [ meta, setMeta ] = useState<{last_page: number}>({
    last_page: 1
  })

  const fetch = async () => {
    const { data: students, meta } = await getUsers(page);
    setStudents(students)
    setMeta(meta)
  }

  useEffect(() => {
    if (user && user.name == 'admin'){
      fetch()
    }
  }, [user])

  
  if (!user){
    return <div className="flex flex-col items-center justify-center">
        <EmptyMessage text="You are prohibited to access this page. Please login first!" title="Unauthorized"/>
        <a href="/career-link/">Login here</a>
    </div>
  }
  
  return (
    <>
      {(user && user.name == "admin") ? (
        <HomeAdmin student={students} cur={page} lastPage={meta.last_page}/>
      ) : (
        <HomeProfileCard />
      )}
    </>
  );
}
