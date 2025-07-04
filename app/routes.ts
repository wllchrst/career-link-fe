import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  route("auth", "components/layouts/auth-layout.tsx", [
    route("login", "routes/auth/login.tsx"),
  ]),

  route("", "components/layouts/navbar-layout.tsx", [
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
      route(
        ":bootcamp/enrollment",
        "routes/app/admin/enrollments/enrollments.tsx"
      ),
    ]),
    ...prefix("bootcamps/:bootcamp", [
      route("session/:session", "routes/app/sessions/session-detail.tsx"),
      route(
        "session/:session/test/:test/attempt/:attempt",
        "routes/app/sessions/session-test-attempt-page.tsx"
      ),
      route(
        "session/:session/test/:test/manage",
        "routes/app/admin/sessions/session-test-admin-page.tsx"
      ),
      route(
        "session/:session/test/:test/result",
        "routes/app/admin/sessions/session-test-results.tsx"
      ),
      route(
        "session/:session/assignment/:assignment/answer",
        "routes/app/admin/assignments/assignment-answers.tsx"
      ),
      route(
        "session/:session/attendance",
        "routes/app/admin/attendances/attendances.tsx"
      ),
    ]),
    ...prefix("admin", [
      route("bootcamps", "routes/app/admin/bootcamps/bootcamps.tsx"),
      route(
        "bootcamps/categories",
        "routes/app/admin/bootcamps/bootcamp-categories.tsx"
      ),
      route("bootcamps/types", "routes/app/admin/bootcamps/bootcamp-types.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
