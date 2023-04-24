import { PrismaClient } from "@prisma/client";

export abstract class BaseService {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
}

export abstract class BaseServiceWithTenant extends BaseService {
  protected tenantId: string;

  constructor(prisma: PrismaClient, tenantId: string) {
    super(prisma);
    this.tenantId = tenantId;
  }
}
