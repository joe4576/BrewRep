import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { User } from "./models/user.model";
import { AuthenticationService } from "./services/authenticationService";
import { UserService } from "./services/userService";

const prisma = new PrismaClient();

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
      // silently fail - if any of the above rejects, then the session
      // context will just remain null
    }
  }

  return {
    prisma,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
