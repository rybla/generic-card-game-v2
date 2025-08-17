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
                                {session.user.name !== undefined && (
                                    <div className={styles.name}>
                                        {session.user.name}
                                    </div>
                                )}
                                {/*{session.user.email !== undefined && (
                                    <div className={styles.email}>
                                        {session.user.email}
                                    </div>
                                )}*/}
                                {session.user.id !== undefined && (
                                    <div className={styles.id}>
                                        {session.user.id}
                                    </div>
                                )}
                                {session.user.image !== undefined &&
                                    session.user.image !== null && (
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
                    <SignInButton />
                )}
            </div>
        </div>
    );
}
