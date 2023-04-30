import { BaseService } from "./baseService";
import prisma from "../../prismaClient";
import { CommunicationLog } from "../models/communicationLog.model";

export class CommunicationLogService extends BaseService {
  public async getCommunicationLogsForOutlet(outletId: string) {
    const logs = await prisma.communicationLog.findMany({
      where: {
        outletId,
        AND: {
          tenantId: this.tenantId,
        },
      },
    });

    return logs;
  }

  public async createCommunicationLog(log: CommunicationLog) {
    if (this.tenantId !== log.tenantId) {
      throw new Error("Tenant ids don't match");
    }

    const existingLog = await prisma.communicationLog.findFirstOrThrow({
      where: {
        id: log.id,
      },
    });

    if (existingLog) {
      throw new Error(`Log with id ${log.id} already exists`);
    }

    const newLog = await prisma.communicationLog.create({
      data: log,
    });

    return newLog;
  }
}
