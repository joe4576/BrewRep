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
        salesVisits: {
          orderBy: {
            startTime: "asc",
          },
        },
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

  public async completeVisit(visitId: string, journeyId: string) {
    const visit = await prisma.salesVisit.findFirst({
      where: {
        tenantId: this.tenantId,
        AND: {
          id: visitId,
        },
      },
    });

    if (
      visit?.salesJourneyId !== journeyId ||
      this.tenantId !== visit.tenantId
    ) {
      throw new Error("Visit is not on journey");
    }

    const updatedVisit = await prisma.salesVisit.update({
      where: {
        id: visitId,
      },
      data: {
        status: "COMPLETE",
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

  public async completeJourney(input: { id: string; endMileage: number }) {
    const { id, endMileage } = input;
    const journey = await prisma.salesJourney.findFirst({
      where: {
        tenantId: this.tenantId,
        AND: {
          id,
        },
      },
    });

    if (!journey) {
      throw new Error("Journey not found");
    }

    // Mark all visits as complete
    const updatedJourney = await prisma.salesJourney.update({
      where: {
        id,
      },
      data: {
        completed: true,
        inProgress: false,
        endMilage: endMileage,
        salesVisits: {
          updateMany: {
            where: {
              salesJourneyId: id,
            },
            data: {
              status: "COMPLETE",
            },
          },
        },
      },
    });

    return updatedJourney;
  }

  public async deleteSalesJourney(journey: SalesJourney) {
    if (journey.tenantId !== this.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    await prisma.salesJourney.delete({
      where: {
        id: journey.id,
      },
    });
  }
}
