/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { authOptions } from "@/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
