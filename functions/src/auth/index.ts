import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

import { generateDisplayNameFromEmail } from "#utils";

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName } = user;

  try {
    const userDoc = {
      uid: uid,
      email: email,
      username: displayName || generateDisplayNameFromEmail(email),
      createdAt: admin.firestore.Timestamp.now(),
      role: "REGULAR",
      followersCount: 0,
    };

    await admin.firestore().collection("users").doc(uid).set(userDoc);
  } catch (error) {
    throw new functions.https.HttpsError(
      "internal",
      "Something went wrong",
      error.message
    );
  }
});
