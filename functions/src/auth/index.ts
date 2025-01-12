import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

import { generateDisplayNameFromEmail, generateUUID } from "#utils";

export const onUserCreated = functions.auth
  .user()
  .onCreate(async (user, _context) => {
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

      const cartId = generateUUID();
      const userCart = {
        id: cartId,
        games: [],
        quantity: 0,
        subtotal: 0,
      };

      // Add the user document to the Firestore collection
      await admin.firestore().collection("users").doc(uid).set(userDoc);

      // Reference the user document and add the `cart` subcollection
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("cart")
        .doc(cartId)
        .set(userCart);
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "Something went wrong",
        error.message
      );
    }
  });
