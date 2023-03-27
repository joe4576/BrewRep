import { PrismaClient } from "@prisma/client";
import { User } from "../models/user.model";
import { BaseService } from "./baseService";

export class AuthenticationService extends BaseService {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  /**
   * Registers a new user
   *
   * @param user name and uid of user to register
   * @returns newly created user object
   */
  public async registerUser(user: Pick<User, "name" | "uid">) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        uid: {
          equals: user.uid,
        },
      },
    });

    if (existingUser) {
      throw new Error(`User with uid ${user.uid} already exists`);
    }

    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        uid: user.uid,
      },
    });

    return newUser;
  }
}
