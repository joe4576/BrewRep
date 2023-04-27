import prisma from "../../prismaClient";
import { Outlet } from "../models/outlet.model";
import { BaseService } from "./baseService";

export class OutletService extends BaseService {
  public async createOutlet(outlet: Outlet) {
    if (outlet.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    const foundOutlet = await prisma.outlet.findFirst({
      where: {
        id: outlet.id,
        AND: {
          tenantId: this.tenantId,
        },
      },
    });

    if (foundOutlet) {
      throw new Error(`Outlet with id ${outlet.id} already exists`);
    }

    // override tenantId with verified id from middleware
    outlet.tenantId = this.tenantId;

    await prisma.outlet.create({
      data: outlet,
    });

    return outlet;
  }

  public async getOutlet(outletId: string) {
    const outlet = await prisma.outlet.findFirst({
      where: {
        id: outletId,
        AND: {
          tenantId: this.tenantId,
        },
      },
    });

    if (!outlet) {
      throw new Error("Outlet not found");
    }

    return outlet;
  }

  public async getAllOutlets() {
    const outlets = await prisma.outlet.findMany({
      where: {
        tenantId: this.tenantId,
      },
    });

    return outlets;
  }

  public async saveOutlet(outlet: Outlet) {
    if (outlet.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    const updatedOutlet = await prisma.outlet.update({
      where: {
        id: outlet.id,
      },
      data: outlet,
    });

    return updatedOutlet;
  }

  public async deleteOutlet(outlet: Outlet) {
    if (outlet.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    // TODO: add logic to check for user permissions

    await prisma.outlet.delete({
      where: {
        id: outlet.id,
      },
    });
  }
}
