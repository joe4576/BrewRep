import prisma from "../../prismaClient";

export class TenantService {
  public async getAllTenants(userId: string) {
    const allTenants = await prisma.tenant.findMany({
      where: {
        users: {
          some: {
            id: {
              equals: userId,
            },
          },
        },
      },
      include: {
        users: true,
      },
    });

    return allTenants;
  }

  /**
   * Verifies the tenant exists, and that the user is a part of that
   * tenant.
   *
   * @throws If verification fails
   *
   * @param tenantGroupId Tenant group id
   * @param tenantId Tenant id
   * @param userId User id
   * @returns Tenant if valid
   */
  public async verifyTenantAndUser(tenantId: string, userId: string) {
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: tenantId,
      },
      include: {
        users: true,
      },
    });

    if (!tenant) {
      throw new Error(`Tenant with id ${tenantId} not found`);
    }

    // check that user is in the tenant
    if (!tenant.users.find((user) => user.id === userId)) {
      throw new Error(
        `User with id ${userId} not found in group with id ${tenantId}`
      );
    }

    return tenant;
  }
}
