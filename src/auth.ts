import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import env from "./env";

export const authConfig: AuthOptions = {
    providers: [
        Google({
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        }),
    ],
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(authConfig);
