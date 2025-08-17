/* eslint-disable @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unnecessary-condition */

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import env from "./env";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            // even though user's type doesn't allow `undefined`, apparently that still happens sometimes, so we have to check if user is defined before accessing `user.id`
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            return session;
        },
    },
});
