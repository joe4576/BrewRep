import prisma from "../../prismaClient";
import { Outlet } from "../models/outlet.model";
import { BaseService } from "./baseService";
import { globalBrewmanAuth } from "../../bmapi/auth";
import { BrewmanLinkService } from "./brewmanLinkService";
import {
  postOutletV1GetAllOutlets,
  postOutletV1GetOutlets,
} from "../../bmapi/services";
import { Outlet as BrewManOutlet } from "../../bmapi/types";

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

  public async getOutlets(outletIds: string[]) {
    const outlets = await prisma.outlet.findMany({
      where: {
        tenantId: this.tenantId,
        AND: {
          id: {
            in: outletIds,
          },
        },
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

    await prisma.outlet.delete({
      where: {
        id: outlet.id,
      },
    });
  }

  private buildOutletFromBrewManOutlet(brewmanOutlet: BrewManOutlet): Outlet {
    return {
      tenantId: this.tenantId,
      id: brewmanOutlet.id,
      name: brewmanOutlet.displayName ?? "no name given",
      code: brewmanOutlet.readOnly.code ?? "no code given",
      lat: brewmanOutlet.readOnly.mainLatitude?.toString() ?? "",
      long: brewmanOutlet.readOnly.mainLongitude?.toString() ?? "",
      isBrewManOutlet: true,
    };
  }

  public async getAllBrewManOutlets(): Promise<Outlet[]> {
    const brewmanLinkService = new BrewmanLinkService(this.tenantId);

    const link = await brewmanLinkService.getBrewmanLink();

    if (!link) {
      throw new Error("No BrewMan link found");
    }

    const { brewmanTenantId, brewmanApiKey } = link;

    globalBrewmanAuth.apiToken = brewmanApiKey;

    const outlets = await postOutletV1GetAllOutlets({
      tenantId: brewmanTenantId,
    });

    globalBrewmanAuth.apiToken = "";

    return (
      outlets.data.outlets?.map((outlet) =>
        this.buildOutletFromBrewManOutlet(outlet)
      ) ?? []
    );
  }

  public async importBrewManOutlets(brewmanOutletIds: string[]) {
    const brewmanLinkService = new BrewmanLinkService(this.tenantId);

    const link = await brewmanLinkService.getBrewmanLink();

    if (!link) {
      throw new Error("No BrewMan link found");
    }

    const { brewmanTenantId, brewmanApiKey } = link;

    globalBrewmanAuth.apiToken = brewmanApiKey;

    // get all specified outlets from brewmman
    const selectedOutlets = await postOutletV1GetOutlets({
      tenantId: brewmanTenantId,
      outletId: brewmanOutletIds,
    });

    globalBrewmanAuth.apiToken = "";

    const transformedOutlets =
      selectedOutlets.data.outlets?.map((outlet) =>
        this.buildOutletFromBrewManOutlet(outlet)
      ) ?? [];

    if (transformedOutlets.length === 0) {
      throw new Error("No outlets to transform");
    }

    // now create the newly imported outlets - skipDuplicates will ignore any outlets
    // that exist with the unique "id" field
    const newOutlets = await prisma.outlet.createMany({
      skipDuplicates: true,
      data: transformedOutlets,
    });

    return newOutlets;
  }
}
