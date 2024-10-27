import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

export const onDeleteUserDocument = functions.firestore.onDocumentDeleted(
  "users/{uid}",
  async (event) => {
    const { uid } = event.params;

    try {
      await admin.auth().deleteUser(uid);
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "Error removing user",
        error
      );
    }
  }
);
