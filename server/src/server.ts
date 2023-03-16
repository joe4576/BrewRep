import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { createContext } from "./context";
import { userRouter } from "./routers/user.router";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
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
