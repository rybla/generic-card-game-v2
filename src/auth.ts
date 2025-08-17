import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { type NextAuthOptions } from "next-auth";
import env from "./env";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: env.AUTH_SECRET,
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
