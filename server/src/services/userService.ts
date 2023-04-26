import prisma from "../../prismaClient";
import { User } from "../models/user.model";
import { BaseService } from "./baseService";

export class UserService extends BaseService {
  public async getAllUsers(): Promise<User[]> {
    const allUsers: User[] = await prisma.user.findMany();
    return allUsers;
  }

  public async saveUser(user: User) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    return updatedUser;
  }

  public async removeUserFromCurrentTenant(userId: string) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tenants: {
          disconnect: {
            id: this.tenantId,
          },
        },
      },
    });

    return user;
  }

  public async addUserToCurrentTenant(userId: string) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tenants: {
          connect: {
            id: this.tenantId,
          },
        },
      },
    });

    return user;
  }
}

export class PublicUserService {
  public async getUserByUid(uid: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        uid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
