import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

export const joeId = uuid();
export const chrisId = uuid();
export const tenantId = uuid();

export default async function generateTenantData(prisma: PrismaClient) {
  // create base tenant
  await prisma.tenant.create({
    data: {
      name: "Joe's Brewery",
      id: tenantId,
      users: {
        create: {
          name: "Joe",
          id: joeId,
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
      id: chrisId,
      uid: "sb6gnsxqBKgn0xgu6sV2SUcFAEw1",
      tenants: {
        connect: {
          id: tenantId,
        },
      },
    },
  });
}
