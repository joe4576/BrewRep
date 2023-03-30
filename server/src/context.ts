import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { User } from "./models/user.model";
import { AuthenticationService } from "./services/authenticationService";
import { TenantSerice } from "./services/tenantService";
import { UserService } from "./services/userService";

const prisma = new PrismaClient();

interface Session {
  user: User;
}

interface TenantInfo {
  tenantGroupId: string;
  tenantId: string;
}

/**
 * Create a context object for each procedure call
 */
export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  let session: Session | null = null;
  let tenantInfo: TenantInfo | null = null;

  const sessionToken = req.headers.authorization;

  if (sessionToken) {
    const authenticationService = new AuthenticationService(prisma);
    const userService = new UserService(prisma);

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

  const tenantGroupId = req.headers.tenantgroupid as string;
  const tenantId = req.headers.tenantid as string;

  if (session && tenantGroupId && tenantId) {
    const tenantService = new TenantSerice(prisma);

    try {
      await tenantService.verifyTenantGroupAndUser(
        tenantGroupId,
        tenantId,
        session.user.id
      );
    } catch (e) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorised to access the tenant group",
        cause: e,
      });
    }

    tenantInfo = {
      tenantId,
      tenantGroupId,
    };
  }

  return {
    prisma,
    session,
    tenantInfo,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
