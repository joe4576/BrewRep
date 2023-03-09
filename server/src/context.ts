import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

// created for each request
export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const sessionToken = "hello" as string | null;
  console.log(req.headers);

  return {
    session: sessionToken,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
