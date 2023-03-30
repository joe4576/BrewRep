import { BaseService } from "./baseService";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { User } from ".prisma/client";

export class AuthenticationService extends BaseService {
  /**
   * Registers a new user
   *
   * @param user name and uid of user to register
   * @returns newly created user object
   */
  public async registerUser(name: string, idToken: string) {
    let uid: string;

    try {
      const result = await this.verifyFirebaseIdToken(idToken);
      uid = result.uid;
    } catch {
      throw new Error("Failed to verify id token");
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        uid: {
          equals: uid,
        },
      },
    });

    if (existingUser) {
      throw new Error(`User with uid ${uid} already exists`);
    }

    const newUser = await this.prisma.user.create({
      data: {
        name,
        uid,
      },
    });

    return newUser;
  }

  /**
   * Verifies a temporary id token from the client.
   *
   * @param idToken Id Token generated by client firebase login
   * @returns uid of verified user
   */
  private async verifyFirebaseIdToken(idToken: string) {
    let token: DecodedIdToken;

    try {
      token = await getAuth().verifyIdToken(idToken);
    } catch {
      throw new Error("Failed to verify id token");
    }

    return {
      uid: token.uid,
      // this will never be undefined if signing in with
      // Google, but can be if other auth providers are used.
      // provide default value just in case
      email: token.email ?? "no_email",
      provider: token.firebase.sign_in_provider,
    };
  }

  /**
   * Creates a new session token for a new client login
   *
   * @param idToken Temporary id token from the client
   * @returns New session token
   */
  public async createSessionToken(idToken: string) {
    try {
      await this.verifyFirebaseIdToken(idToken);
    } catch {
      throw new Error("Failed to verify id token");
    }

    const sessionToken = await getAuth().createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
    });

    return {
      sessionToken,
    };
  }

  /**
   * Verifies a session token
   *
   * @param sessionToken Session token to verify
   * @returns uid of verified user
   */
  public async verifySessionToken(sessionToken: string) {
    let decodedClaims: DecodedIdToken;

    try {
      decodedClaims = await getAuth().verifySessionCookie(sessionToken, true);
    } catch {
      throw new Error("Session token is invalid");
    }

    return {
      uid: decodedClaims.uid,
    };
  }

  /**
   * Sign in with Google. This function verifies the id token, and then
   * checks if the user exists in the DB. If it does, create a new session
   * token and return.
   *
   * If a user doesn't exist, then create a new one in the DB, create
   * a new session token and return.
   *
   * @param idToken Temporary id token from client Google popup
   * @returns session token
   */
  public async googleSignIn(idToken: string) {
    let uid, email: string;

    try {
      const result = await this.verifyFirebaseIdToken(idToken);
      uid = result.uid;
      email = result.email;
    } catch {
      throw new Error("Failed to verify id token");
    }

    // check if a user with uid exists
    const foundUser = await this.prisma.user.findFirst({
      where: {
        uid: {
          equals: uid,
        },
      },
    });

    // if it does, create a session token and return
    if (foundUser) {
      return await this.createSessionToken(idToken);
    }

    // if no user found, create one
    await this.prisma.user.create({
      data: {
        name: email,
        uid,
      },
    });

    // create and return new session token
    return await this.createSessionToken(idToken);
  }
}