"use client";

import { doSignOut } from "@/actions/auth";
import styles from "./SignOutButton.module.css";

export default function SignOutButton() {
    return (
        <button className={styles.SignOutButton} onClick={() => void doSignOut()}>
            Sign Out
        </button>
    );
}
