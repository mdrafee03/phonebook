import * as Koa from "koa";
import * as Router from "koa-router";
import { config } from "dotenv";
import { postgresDB } from "./database/postgres-db";
import { restRouter } from "./routes/rest-routes";
import * as bodyParser from "koa-bodyparser";
const app = new Koa();
const router = new Router();
config();
const bootstrap = async () => {
  await postgresDB();
  app.use(bodyParser());
  app.use(restRouter.routes()).use(restRouter.allowedMethods());
  app.listen(process.env.APP_PORT, () => {
    console.log("App is running");
  });
};
bootstrap();
