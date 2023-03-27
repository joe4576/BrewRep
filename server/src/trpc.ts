import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.uid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "There is no valid session token on the request",
    });
  }

  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
