import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("announcements", "routes/app/announcements/announcements.tsx"),
] satisfies RouteConfig;
