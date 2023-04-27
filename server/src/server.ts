import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { createContext } from "./context";
import { authenticationRouter } from "./routers/authentication.router";
import { userRouter } from "./routers/user.router";
import { router } from "./trpc";
import "./config/firebase";
import { tenantRouter } from "./routers/tenant.router";
import { taskRouter } from "./routers/task.router";
import { outletRouter } from "./routers/outlet.router";

export const appRouter = router({
  user: userRouter,
  authentication: authenticationRouter,
  tenant: tenantRouter,
  task: taskRouter,
  outlet: outletRouter,
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(4000);
