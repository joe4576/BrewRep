import { User } from "../models/user.model";
import prisma from "../../prismaClient";

export class UserService {
  public async getUserById(id: string): Promise<User | null> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    const allUsers: User[] = await prisma.user.findMany();
    return allUsers;
  }

  public async getCurrentUser(uid: string): Promise<User> {
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
