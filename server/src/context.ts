import { TRPCError, inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { User } from "./models/user.model";
import { AuthenticationService } from "./services/authenticationService";
import { UserService } from "./services/userService";
import { Tenant } from "./models/tenant.model";
import { TenantService } from "./services/tenantService";

interface Session {
  user: User;
}

/**
 * Create a context object for each procedure call
 */
export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  let session: Session | null = null;
  let tenant: Tenant | null = null;

  const sessionToken = req.headers.authorization as string;
  const tenantId = req.headers.tenantid as string;

  if (sessionToken) {
    const authenticationService = new AuthenticationService();
    const userService = new UserService();

    try {
      const { uid } = await authenticationService.verifySessionToken(
        sessionToken
      );
      const currentUser = await userService.getCurrentUser(uid);
      session = {
        user: currentUser,
      };
    } catch (_) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to validate session token",
      });
    }
  }

  if (tenantId && session) {
    const tenantService = new TenantService();
    try {
      // TODO make id requried
      tenant = await tenantService.verifyTenantAndUser(
        tenantId,
        session.user.id!
      );
    } catch {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorised to access this tenant",
      });
    }
  }

  return {
    session,
    tenant,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
