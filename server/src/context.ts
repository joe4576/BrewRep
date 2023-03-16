import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

const prisma = new PrismaClient();

// created for each request
export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  return {
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
