import { BaseService } from "./baseService";
import prisma from "../../prismaClient";
import { SalesVisit } from "../models/salesVisit.model";

export class SalesVisitService extends BaseService {
  public async getAllSalesVisits() {
    const visits = await prisma.salesVisit.findMany({
      where: {
        tenantId: this.tenantId,
      },
      include: {
        salesJourney: true,
      },
    });

    return visits;
  }

  public async getSalesVisit(salesVisitId: string) {
    const visit = await prisma.salesVisit.findFirst({
      where: {
        tenantId: this.tenantId,
        AND: {
          id: salesVisitId,
        },
      },
      include: {
        salesJourney: true,
      },
    });

    if (!visit) {
      throw new Error(`Visit with id ${salesVisitId} not found`);
    }

    return visit;
  }

  public async createSalesVisit(visit: SalesVisit) {
    if (visit.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    const newVisit = await prisma.salesVisit.create({
      data: visit,
    });

    return newVisit;
  }

  public async saveSalesVisit(visit: SalesVisit) {
    if (visit.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    await prisma.salesVisit.update({
      data: visit,
      where: {
        id: visit.id,
      },
    });
  }

  public async deleteSalesVisit(visit: SalesVisit) {
    if (visit.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    await prisma.salesVisit.delete({
      where: {
        id: visit.id,
      },
    });
  }
}
