import prisma from "../../prismaClient";
import { SalesJourney } from "../models/salesJourney.model";
import { BaseService } from "./baseService";

export class SalesJourneyService extends BaseService {
  public async getAllSalesJourneys() {
    const journeys = await prisma.salesJourney.findMany({
      where: {
        tenantId: this.tenantId,
      },
    });

    return journeys;
  }

  /**
   * Gets a specific sales journey and all of its visits
   * @param salesJourneyId
   */
  public async getSalesJourney(salesJourneyId: string) {
    const journey = await prisma.salesJourney.findFirst({
      where: {
        tenantId: this.tenantId,
        AND: {
          id: salesJourneyId,
        },
      },
      include: {
        salesVisits: true,
      },
    });

    if (!journey) {
      throw new Error(`Journey with id ${salesJourneyId} not found`);
    }

    return journey;
  }

  public async saveSalesJourney(journey: SalesJourney) {
    if (journey.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    const journeysWithReference = await prisma.salesJourney.findMany({
      where: {
        reference: journey.reference,
        AND: {
          tenantId: this.tenantId,
        },
      },
    });

    if (journeysWithReference.length) {
      throw new Error(
        `Journey with reference ${journey.reference} already exists`
      );
    }

    await prisma.salesJourney.update({
      data: journey,
      where: {
        id: journey.id,
      },
    });
  }

  public async removeVisitFromSalesJourney(
    visitId: string,
    salesJourneyId: string
  ) {
    const journey = await prisma.salesJourney.update({
      where: {
        id: salesJourneyId,
      },
      data: {
        salesVisits: {
          disconnect: {
            id: visitId,
          },
        },
      },
    });

    return journey;
  }

  public async addVisitToSalesJourney(visitId: string, salesJourneyId: string) {
    const visit = await prisma.salesVisit.findFirst({
      where: {
        tenantId: this.tenantId,
        AND: {
          id: visitId,
        },
      },
    });

    if (!visit) {
      throw new Error("Visit not found");
    }

    if (visit.salesJourneyId) {
      throw new Error("Visit is already on a journey");
    }

    const updatedVisit = await prisma.salesVisit.update({
      where: {
        id: visitId,
      },
      data: {
        salesJourney: {
          connect: {
            id: salesJourneyId,
          },
        },
      },
    });

    return updatedVisit;
  }

  public async createSalesJourney(journey: SalesJourney) {
    if (journey.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    const newJourney = await prisma.salesJourney.create({
      data: journey,
    });

    return newJourney;
  }

  public async startJourney(journey: SalesJourney, startMilage: number) {
    throw new Error("Not implemented");
  }

  public async endJourney(journey: SalesJourney) {
    throw new Error("Not implemented");
  }

  public async completeJourney(journey: SalesJourney) {
    // Once a journey has been completed, it is locked.
    // sales visits are marked as complete manually.
    // once a journey is locked, no changes can be made.
    // also, to complete a journey, start and end milage must be given.

    // TODO - add JourneyStatus enum = {pending, in progress, complete}
    throw new Error("Not implemented");
  }
}
