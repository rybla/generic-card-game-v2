import type { Metadata } from "next";
import NextAuthSessionProvider from "@/component/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
    title: "generic-card-game-v2",
    description: "A generic card game platform.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
            </body>
        </html>
    );
}
