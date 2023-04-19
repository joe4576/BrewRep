import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

export default async function generateTenantData(prisma: PrismaClient) {
  const tenantId = uuid();
  // create base tenant
  await prisma.tenant.create({
    data: {
      name: "Joe's Brewery",
      id: tenantId,
      users: {
        create: {
          name: "Joe",
          uid: "I7NAdJZjoNTx93P9vp9GQHFzk1p1",
          isAdmin: true,
        },
      },
    },
  });

  // create another user and add to tenant
  // admin@brewrep.com
  // SecurePassword123
  await prisma.user.create({
    data: {
      name: "Chris",
      uid: "sb6gnsxqBKgn0xgu6sV2SUcFAEw1",
      tenants: {
        connect: {
          id: tenantId,
        },
      },
    },
  });
}
