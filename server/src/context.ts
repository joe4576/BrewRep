import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

const prisma = new PrismaClient();

// Session from firebase
// TODO: add relevant fields
interface Session {
  uid: string;
}

// created for each request
export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  let session = null as Session | null;

  return {
    prisma,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
