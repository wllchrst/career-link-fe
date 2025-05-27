import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("announcements", [
    index("routes/app/announcements/announcements.tsx"),
    route(":announcement", "routes/app/announcements/announcement.tsx"),
  ]),
  ...prefix("certificates", [
    index("routes/app/certificates/certificates.tsx"),
    route(":certificate", "routes/app/certificates/certificate.tsx"),
  ]),
  ...prefix("bootcamps", [
    index("routes/app/bootcamps/bootcamps.tsx"),
    route(":bootcamp", "routes/app/bootcamps/bootcamp-detail.tsx"),
    route(":bootcamp/enrollment", "routes/app/admin/enrollments/enrollments.tsx"),
  ]),
  ...prefix("admin", [
    route("bootcamps", "routes/app/admin/bootcamps/bootcamps.tsx"),
    route(
      "bootcamps/categories",
      "routes/app/admin/bootcamps/bootcamp-categories.tsx"
    ),
    route("bootcamps/types", "routes/app/admin/bootcamps/bootcamp-types.tsx"),
  ]),
  ...prefix("session", [
    route(":session", "routes/app/sessions/session-detail.tsx"),
    route(
      ":session/test/:test/attempt/:attempt",
      "routes/app/sessions/session-test-attempt-page.tsx"
    ),
    route(
      ":session/test/:test/manage",
      "routes/app/admin/sessions/session-test-admin-page.tsx"
    ),
    route(
      ":session/test/:test/result",
      "routes/app/admin/sessions/session-test-results.tsx"
    ),
    route(
      ":session/assignment/:assignment/answer",
      "routes/app/admin/assignments/assignment-answers.tsx"
    ),
    route(
      ":session/attendance",
      "routes/app/admin/attendances/attendances.tsx"
    ),
  ]),
] satisfies RouteConfig;
