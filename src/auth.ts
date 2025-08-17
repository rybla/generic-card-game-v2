import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
): Promise<Session | null> {
    return getServerSession(...args, authOptions);
}
