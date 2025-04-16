import HomeAdmin from "~/features/home/components/home-admin";
import { Welcome } from "../components/welcome/welcome";
import { HomeProfileCard } from "~/features/home/components/home-profile-card";
import { useRole } from "~/role-testing-provider";
import { StudentData } from "~/features/home/student-dummy-data";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { role } = useRole();

  return (
    <>
      {role == "admin" ? (
        <HomeAdmin student={StudentData} />
      ) : (
        <HomeProfileCard />
      )}
    </>
  );
}
