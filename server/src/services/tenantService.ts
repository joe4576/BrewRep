import { BaseService } from "./baseService";

export class TenantSerice extends BaseService {
  /**
   * Gets all tenant groups and their corresponding tenants
   */
  public async getAllTenantsAndTenantGroups() {
    const tenantsGroupedByTenantGroup = await this.prisma.tenantGroup.findMany({
      include: {
        tenants: true,
      },
    });

    return tenantsGroupedByTenantGroup;
  }

  /**
   * Verifies that userId and tenantId exist in the given tenant group.
   *
   * @throws If verification fails
   *
   *
   * @param tenantGroupId Tenant group id
   * @param tenantId Tenant id
   * @param userId User id
   */
  public async verifyTenantGroupAndUser(
    tenantGroupId: string,
    tenantId: string,
    userId: string
  ) {
    const tenantGroup = await this.prisma.tenantGroup.findUnique({
      where: {
        id: tenantGroupId,
      },
      include: {
        users: true,
        tenants: true,
      },
    });

    if (!tenantGroup) {
      throw new Error(`Tenant group with id ${tenantGroupId} not found`);
    }

    // check that user is in tenant group
    if (!tenantGroup.users.find((user) => user.id === userId)) {
      throw new Error(
        `User with id ${userId} not found in group with id ${tenantGroupId}`
      );
    }

    // check the tenant with id tenantId is in the tenant group
    if (!tenantGroup.tenants.find((tenant) => tenant.id === tenantId)) {
      throw new Error(
        `Tenant with id ${tenantId} not found in group with id ${tenantGroupId}`
      );
    }
  }
}
