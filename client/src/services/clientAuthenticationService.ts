import { client } from "@/api/client";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

/**
 * Service responsible for authenticating a client with Firebase,
 * and then authenticating with the backend to return a valid
 * session token.
 */
class ClientAuthenticationSerivce {
  /**
   * Registers with Firebase and then creates a new account
   * on the server
   *
   * @param email Email address
   * @param password Password
   * @returns session token
   */
  public async registerWithEmailAndPassword(email: string, password: string) {
    let userCredential: UserCredential;

    try {
      userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      // firebase local state doesn't need to be persisted, so sign out of client
      await getAuth().signOut();
    } catch {
      throw new Error(`User with email ${email} already exists`);
    }

    const idToken = await userCredential.user.getIdToken();

    let sessionToken: string;

    try {
      const result = await client.authentication.register.mutate({
        name: email,
        idToken,
      });

      sessionToken = result.sessionToken;
    } catch (e) {
      throw new Error("failed to regsiter with the server", {
        cause: e,
      });
    }

    return sessionToken;
  }

  /**
   * Logs in with Firebase and then gets session token from
   * the server
   *
   * @param email Email address
   * @param password Password
   * @returns session token
   */
  public async loginWithEmailAndPassword(email: string, password: string) {
    let userCredential: UserCredential;

    try {
      userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      // firebase local state doesn't need to be persisted, so sign out of client
      await getAuth().signOut();
    } catch {
      throw new Error(`Incorrect email or password`);
    }

    const idToken = await userCredential.user.getIdToken();

    let sessionToken: string;

    try {
      const result = await client.authentication.login.mutate({
        idToken,
      });

      sessionToken = result.sessionToken;
    } catch (e) {
      throw new Error("failed to regsiter with the server", {
        cause: e,
      });
    }

    return sessionToken;
  }

  /**
   * Opens the 'sign in with Google' popup.
   */
  public async logInWithGoogle() {
    let userCredential: UserCredential;

    try {
      userCredential = await signInWithPopup(
        getAuth(),
        new GoogleAuthProvider()
      );
      // firebase local state doesn't need to be persisted, so sign out of client
      await getAuth().signOut();
    } catch {
      throw new Error(`Couldnt sign in with google`);
    }

    const idToken = await userCredential.user.getIdToken();

    let sessionToken: string;

    try {
      const result = await client.authentication.googleLogin.mutate({
        idToken,
      });

      sessionToken = result.sessionToken;
    } catch (e) {
      throw new Error("failed to regsiter with the server", {
        cause: e,
      });
    }

    return sessionToken;
  }
}

export default new ClientAuthenticationSerivce();
