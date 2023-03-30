import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

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

const isAuthenticatedWithTenantInfo = t.middleware(({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "There is no valid session token on the request",
    });
  }

  if (!ctx.tenantInfo) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:
        "There is no valid session tenant group or tenant id on the request",
    });
  }

  return next({
    ctx: {
      session: ctx.session,
      tenantInfo: ctx.tenantInfo,
    },
  });
});

/**
 * Tier 0 - no authentication
 */
export const publicProcedure = t.procedure;

/**
 * Tier 1 - user authentication but no tenant info
 */
export const protectedProcedure = t.procedure.use(isAuthenticated);

/**
 * Tier 2 - user and tenant authentication
 */
export const tenantProcedure = t.procedure.use(isAuthenticatedWithTenantInfo);
