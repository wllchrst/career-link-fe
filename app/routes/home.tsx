import type { Route } from "../+types/home";
import { Welcome } from "../components/welcome/welcome";
import { HomeProfileCard } from "~/features/home/components/home-profile-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <HomeProfileCard />;
}
