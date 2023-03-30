import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { User } from "./models/user.model";
import { AuthenticationService } from "./services/authenticationService";
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

  const tenantGroupId = req.headers.tenantgroupid;
  const tenantId = req.headers.tenantid;

  if (session && tenantGroupId && tenantId) {
    // TODO verify user belongs to tenant group, and
    // that the given tenant id also belongs to the tenant group
    tenantInfo = {
      tenantId: tenantId as string,
      tenantGroupId: tenantGroupId as string,
    };
  }

  return {
    prisma,
    session,
    tenantInfo,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
