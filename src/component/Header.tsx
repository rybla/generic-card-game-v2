"use client";

import constants from "@/constants";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./Header.module.css";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

export default function Header(props: { subtitle: string }) {
    const { data: session } = useSession();

    return (
        <div className={styles.Header}>
            <div className={styles.title_container}>
                <div className={styles.title}>{constants.app_title}</div>
                <div className={styles.separator}>{"|"}</div>
                <div className={styles.subtitle}>{props.subtitle}</div>
            </div>
            <div className={styles.links_container}>
                {/* TODO: links to other pages */}
            </div>
            <div className={styles.user}>
                {session ? (
                    <>
                        <SignOutButton />
                        {session.user && (
                            <>
                                <div className={styles.name}>
                                    {session.user?.name ?? "Unnamed User"}
                                </div>
                                {session.user.email && (
                                    <div className={styles.email}>
                                        {session.user.email}
                                    </div>
                                )}
                                {session.user.image && (
                                    <div className={styles.image}>
                                        <Image
                                            src={session.user.image}
                                            alt="User Avatar"
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <SignInButton />
                    </>
                )}
            </div>
        </div>
    );
}
