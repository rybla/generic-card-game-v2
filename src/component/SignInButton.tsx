"use client";

import { signIn } from "next-auth/react";
import styles from "./SignInButton.module.css";

export default function SignInButton() {
    return (
        <button
            className={styles.SignInButton}
            onClick={() => void signIn("google")}
        >
            Sign In
        </button>
    );
}
