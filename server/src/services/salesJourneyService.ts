import prisma from "../../prismaClient";
import { SalesJourney } from "../models/salesJourney.model";
import { SalesVisit } from "../models/salesVisit.model";
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

  public async addSalesVisitToJourney(
    journey: SalesJourney,
    salesVisit: SalesVisit
  ) {
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
