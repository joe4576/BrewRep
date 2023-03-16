import { PrismaClient } from "@prisma/client";
import { User } from "../models/user.model";
import { BaseService } from "./baseService";

export class UserService extends BaseService {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  public async getUserById(id: string): Promise<User | null> {
    const user: User | null = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    const allUsers: User[] = await this.prisma.user.findMany();
    return allUsers;
  }

  public async createUser(user: User): Promise<User> {
    const newUser: User = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return newUser;
  }
}
