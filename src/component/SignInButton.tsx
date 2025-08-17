"use client";

import { doSignIn } from "@/actions/auth";
import styles from "./SignInButton.module.css";

export default function SignInButton() {
    return (
        <button className={styles.SignInButton} onClick={() => void doSignIn()}>
            Sign In
        </button>
    );
}
