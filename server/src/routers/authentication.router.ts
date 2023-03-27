import { publicProcedure, router } from "../trpc";
import { User } from "../models/user.model";
import { z } from "zod";
import { AuthenticationService } from "../services/authenticationService";
import { TRPCError } from "@trpc/server";

export const authenticationRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        uid: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let user: User | null;
      const { name, uid } = input;

      const authenticationService = new AuthenticationService(ctx.prisma);

      try {
        user = await authenticationService.registerUser({
          name,
          uid,
        });
      } catch (e) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          cause: e,
        });
      }

      return {
        user,
      };
    }),
});
