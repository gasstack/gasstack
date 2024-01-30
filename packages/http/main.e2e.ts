import appBuilder, { respond } from "./index";

const app = appBuilder((builder) => {
  builder
    .use((req, res) => {
      console.log(req.contextPath);
    })
    .get("/api/:name", (req, res) => {
      respond(res).text(`Hello ${req.pathParams!.name}`);
    })
    .post("/api/:name", (req, res) => {
      respond(res).text(`POST: Hello ${req.pathParams!.name}`);
    })
    .all("/view/:name", (req, res) => {
      respond(res).view("index.e2e", { name: req.pathParams!.name });
    });
});

function doGet(e: GoogleAppsScript.Events.DoGet) {
  return app(e);
}

function doPost(e: GoogleAppsScript.Events.DoGet) {
  return app(e);
}
