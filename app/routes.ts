import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("announcements",[
        index("routes/app/announcements/announcements.tsx"),
        route(":announcement", "routes/app/announcements/announcement.tsx"),
    ]),
] satisfies RouteConfig;
