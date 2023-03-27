import { PrismaClient } from "@prisma/client";

export default async function generateTenantData(prisma: PrismaClient) {
  // temp admin credentials:
  // admin@brewrep.com
  // SecurePassword123

  /**
   * Creates a new admin user, 2 tenants, and a new tenant group
   */
  await prisma.tenantGroup.create({
    data: {
      users: {
        create: {
          name: "Admin",
          uid: "sb6gnsxqBKgn0xgu6sV2SUcFAEw1",
          isAdmin: true,
        },
      },
      tenants: {
        createMany: {
          data: [
            {
              name: "Demo Data 1",
            },
            {
              name: "Demo Data 2",
            },
          ],
        },
      },
    },
  });
}
