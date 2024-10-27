import * as admin from "firebase-admin";
import serviceAccount from "./firebaseServiceAccount.json";

// Configuration for Firebase Admin SDK
const adminConfig = {
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

admin.initializeApp(adminConfig);

// Cloud functions based on roles
import * as auth from "./auth";
import * as users from "./users";

// Export functions
export const onUserCreated = auth.onUserCreated;
export const onDeleteUserDocument = users.onDeleteUserDocument;
