import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import { getServerSession, NextAuthOptions, Session } from "next-auth";
import Google from "next-auth/providers/google";
import env from "./env";

export const authOptions: NextAuthOptions = {
    providers: [
        Google({
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        }),
    ],
};

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
): Promise<Session | null> {
    return getServerSession(...args, authOptions);
}
