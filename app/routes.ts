import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("announcements",[
        index("routes/app/announcements/announcements.tsx"),
        route(":announcement", "routes/app/announcements/announcement.tsx"),
    ]),
    ...prefix("certificates",[
        index("routes/app/certificates/certificates.tsx"),
        route(":certificate", "routes/app/certificates/certificate.tsx"),
    ]),
    ...prefix("bootcamps",[
        index("routes/app/bootcamps/bootcamps.tsx"),
        route(":bootcamp", "routes/app/bootcamps/bootcamp-detail.tsx"),
    ])
] satisfies RouteConfig;
