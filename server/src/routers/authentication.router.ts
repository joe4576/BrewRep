import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { AuthenticationService } from "../services/authenticationService";
import { TRPCError } from "@trpc/server";

export const authenticationRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        idToken: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, idToken } = input;

      const authenticationService = new AuthenticationService(ctx.prisma);

      try {
        // register the user in the database
        await authenticationService.registerUser(name, idToken);
      } catch (e) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          cause: e,
        });
      }

      // now that we have registered the user in the db, create a new session token
      // and return it
      let sessionToken: string;

      try {
        sessionToken = (await authenticationService.createSessionToken(idToken))
          .sessionToken;
      } catch (e) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          cause: e,
        });
      }

      return {
        sessionToken,
      };
    }),

  login: publicProcedure
    .input(
      z.object({
        idToken: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { idToken } = input;
      const authenticationService = new AuthenticationService(ctx.prisma);

      let sessionToken: string;

      try {
        const result = await authenticationService.createSessionToken(idToken);
        sessionToken = result.sessionToken;
      } catch (e) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          cause: e,
        });
      }

      return {
        sessionToken,
      };
    }),

  googleLogin: publicProcedure
    .input(
      z.object({
        idToken: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { idToken } = input;
      const authenticationService = new AuthenticationService(ctx.prisma);

      let sessionToken: string;

      try {
        const result = await authenticationService.googleSignIn(idToken);
        sessionToken = result.sessionToken;
      } catch (e) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          cause: e,
        });
      }

      return {
        sessionToken,
      };
    }),
});
