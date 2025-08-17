import constants from "@/constants";
import styles from "./Header.module.css";
import SignInButton from "./SignInButton";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";

export default async function Header(props: { subtitle: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const session = await auth();

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
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {session?.user ? (
                    <>
                        <SignOutButton />
                        <div className={styles.username}>
                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                            {session.user.name ?? "Unnamed User"}
                        </div>
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
