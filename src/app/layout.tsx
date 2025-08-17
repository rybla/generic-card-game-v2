import type { Metadata } from "next";
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
            <body>{children}</body>
        </html>
    );
}
