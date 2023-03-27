import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { createContext } from "./context";
import { authenticationRouter } from "./routers/authentication.router";
import { userRouter } from "./routers/user.router";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  authentication: authenticationRouter,
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
