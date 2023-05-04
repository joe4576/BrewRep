import { PrismaClient } from "@prisma/client";
import { SharedIds } from "./utils";

/**
 * Only used for dev database seeding - when resetting demo data,
 * user will already have a tenant and user, which don't get touched
 */
export default async function generateTenantData(
  prisma: PrismaClient,
  options: {
    sharedIds: SharedIds;
  }
) {
  const { sharedIds } = options;
  // create base tenant
  await prisma.tenant.create({
    data: {
      name: "Joe's Brewery",
      id: sharedIds.tenantId,
      users: {
        create: {
          name: "Joe",
          id: sharedIds.userId,
          uid: "I7NAdJZjoNTx93P9vp9GQHFzk1p1",
          isAdmin: true,
        },
      },
    },
  });
}
