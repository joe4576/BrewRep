import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import serviceAccount from "./brewrep-fyp-firebase-adminsdk-key.json";

/**
 * Importing this file initialises the firebase admin sdk
 */
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});
