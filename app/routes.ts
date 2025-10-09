import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  route("/", "components/layouts/auth-layout.tsx", [
    index("routes/auth/login.tsx"),
  ]),
  
  layout("components/layouts/navbar-layout.tsx", [
    route("/home", "routes/home.tsx"),
    route("/enrichment", "routes/enrichment.tsx"),
    route("/thesis", "routes/thesis.tsx"),
    route("/future", "routes/future.tsx"),
    ...prefix("announcements", [
      index("routes/app/announcements/announcements.tsx"),
      route(":announcementId", "routes/app/announcements/announcement.tsx"),
    ]),
    ...prefix("certificates", [
      index("routes/app/certificates/certificates.tsx"),
      route(":id", "routes/app/certificates/certificate.tsx"),
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
        "session/:session/evaluation",
        "routes/app/admin/sessions/session-evaluation-admin-page.tsx"
      ),
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
        "bootcamps/:bootcamp/report",
        "routes/app/admin/bootcamps/bootcamp-report.tsx"
      ),
      route(
        "bootcamps/categories",
        "routes/app/admin/bootcamps/bootcamp-categories.tsx"
      ),
      route("bootcamps/types", "routes/app/admin/bootcamps/bootcamp-types.tsx"),
    ]),
  ]),

] satisfies RouteConfig;
