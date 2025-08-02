import HomeAdmin from "~/features/home/components/home-admin";
import { HomeProfileCard } from "~/features/home/components/home-profile-card";
import { useRole } from "~/provider/role-testing-provider";
import type { Route } from "./+types/home";
import { getUsers } from "~/features/home/api/get-student-data";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { useAuth } from "~/lib/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async ({request}:{request:Request}) => {
    
    const url = new URL(request.url); 
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const { data: students, meta } = await getUsers(page);
    return {students, page, meta }
};


export default function Home({loaderData}: Route.ComponentProps) {
  
  const { role } = useRole();
  const {students, page, meta} = loaderData
  
  return (
    <>
      {role == "admin" ? (
        <HomeAdmin student={students} cur={page} lastPage={meta.last_page}/>
      ) : (
        <HomeProfileCard />
      )}
    </>
  );
}
