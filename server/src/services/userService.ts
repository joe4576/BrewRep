import { Context } from "../context";
import { User } from "../models/user.model";
import { BaseService } from "./baseService";

export class UserService extends BaseService {
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

  public async getCurrentUser(uid: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
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
