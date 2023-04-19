import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = t.middleware;
export const router = t.router;

const isAuthenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "There is no valid session token on the request",
    });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

const isAuthenticatedWithTenant = t.middleware(({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "There is no valid session token on the request",
    });
  }

  if (!ctx.tenant) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "There is no valid TenantId on the request",
    });
  }

  return next({
    ctx: {
      session: ctx.session,
      tenant: ctx.tenant,
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const tenantProcedure = t.procedure.use(isAuthenticatedWithTenant);
