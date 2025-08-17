"use server";

import { signIn, signOut } from "@/auth";

export function doSignIn() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    signIn("google");
}

export function doSignOut() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    signOut();
}
