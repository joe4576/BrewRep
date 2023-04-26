import prisma from "../../prismaClient";
import { Tenant } from "../models/tenant.model";
import { BaseService } from "./baseService";

export class TenantService {
  public async getTenant(tenantId: string) {
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: tenantId,
      },
      include: {
        users: true,
      },
    });

    if (!tenant) {
      throw new Error("Tenant not found");
    }

    return tenant;
  }

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

  public async createTenant(tenant: Tenant, ownerId: string) {
    const existingTenant = await prisma.tenant.findFirst({
      where: {
        id: tenant.id,
      },
    });

    if (existingTenant) {
      throw new Error(`Tenant with id ${tenant.id} already exists`);
    }

    const newTenant = await prisma.tenant.create({
      data: {
        ...tenant,
        users: {
          connect: {
            id: ownerId,
          },
        },
      },
    });

    return newTenant;
  }
}

export class ProtectedTenantService extends BaseService {
  public async saveTenant(tenant: Tenant) {
    if (tenant.id !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    const updatedTenant = await prisma.tenant.update({
      where: {
        id: tenant.id,
      },
      data: tenant,
    });

    return updatedTenant;
  }
}
