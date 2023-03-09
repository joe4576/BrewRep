import { TRPCError } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { z } from "zod";
import { Context, createContext } from "./context";
import { userRouter } from "./routers/user.router";
import { middleware, publicProcedure, router } from "./trpc";

export interface User {
  id: string;
  name: string;
}

// const isAuthed = middleware(({ ctx, next }) => {
//   if (!ctx.session) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }

//   return next({
//     ctx: {
//       session: ctx.session,
//     },
//   });
// });

export const appRouter = router({
  getUser: publicProcedure
    .input(z.string())
    .query(async (req): Promise<User> => {
      return { id: req.input, name: "Bilbo" };
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req): Promise<User> => {
      return {
        name: req.input.name,
        id: "new id",
      };
    }),
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
