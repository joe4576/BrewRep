import { BaseService } from "./baseService";
import prisma from "../../prismaClient";
import { BrewmanLink } from "../models/brewmanLink.model";

export class BrewmanLinkService extends BaseService {
  public async getBrewmanLink() {
    const link = await prisma.brewmanLink.findFirst({
      where: {
        tenantId: this.tenantId,
      },
    });

    return link;
  }

  public async createBrewmanLink(link: BrewmanLink) {
    const { brewmanApiKey, brewmanTenantId } = link;

    const newLink = await prisma.brewmanLink.create({
      data: {
        tenantId: this.tenantId,
        brewmanTenantId,
        brewmanApiKey,
      },
    });

    return newLink;
  }

  public async disconnectBrewmanLink() {
    await prisma.brewmanLink.delete({
      where: {
        tenantId: this.tenantId,
      },
    });
  }
}
