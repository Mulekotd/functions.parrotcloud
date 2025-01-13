import * as functions from "firebase-functions/v1";

export const onUserCreated = functions.auth
  .user()
  .onCreate(async (_user, _context) => {});
