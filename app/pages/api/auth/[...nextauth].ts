import {
  bufferToHex,
  ecrecover,
  fromRpcSig,
  hashPersonalMessage,
  publicToAddress,
  toBuffer,
} from "ethereumjs-util";
import { PROVIDERS } from "lib/providers.server";
import { createAccountWithUser, getAccountByProviderAccountId } from "models/account.server";
import { getUser } from "models/user.server";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Gets around expired credential errors when sending fetch requests to API
// routes.
//
// IMPORTANT: This must not run successfully on production.
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    providers: [
      // Derived from: https://github.com/nextauthjs/next-auth/issues/3292
      CredentialsProvider({
        name: "Ethereum",
        id: PROVIDERS.ETHEREUM,
        credentials: {},

        /**
         * Handles custom Ethereum authorization requests.
         */
        authorize: async (credentials: any, _req) => {
          // Extract wallet address with the given credentials.
          let tokenBuffer = toBuffer(`0x${credentials.csrfToken}`);
          let tokenHash = hashPersonalMessage(tokenBuffer);
          let signatureParams = fromRpcSig(credentials.signature);
          let publicKey = ecrecover(
            tokenHash,
            signatureParams.v,
            signatureParams.r,
            signatureParams.s
          );
          let addressBuffer = publicToAddress(publicKey);
          let address = bufferToHex(addressBuffer);
          if (address.toLowerCase() !== credentials.address?.toLowerCase()) {
            return null;
          }

          // Fetch account record.
          let account = await getAccountByProviderAccountId(PROVIDERS.ETHEREUM, address);
          if (!account) {
            account = await createAccountWithUser(PROVIDERS.ETHEREUM, address);
          }

          // This is the `user` object that gets passed to the JWT callback.
          return {
            ...account,
          };
        },
      }),
    ],

    // Ref: https://next-auth.js.org/configuration/callbacks
    callbacks: {
      /**
       * Defines the JWT token contents on the server side.
       */
      jwt: async ({ token, user }) => {
        if (user?.provider === PROVIDERS.ETHEREUM) {
          // First Ethereum sign in.
          token.userId = user.userId;
          token.walletAddress = user.providerAccountId;
        }

        // Fetch database records.
        let userRecord = await getUser(token.userId as string);
        if (!userRecord) return token;

        return token;
      },

      /**
       * Defines the session token contents for the browser. Passing data from
       * the JWT token to persist.
       */
      session: async ({ session, token }) => {
        session.userId = token.userId;
        session.walletAddress = token.walletAddress;

        return session;
      },
    },
  });
};
