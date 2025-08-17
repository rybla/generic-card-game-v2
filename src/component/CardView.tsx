/* eslint-disable @typescript-eslint/no-unused-vars */

import { Card } from "@/ontology";
import styles from "./CardView.module.css";

export default function CardView(props: { card: Card }) {
    return <div className={styles.Card}>
        {/* TODO: interactive UI for viewing a single game card */}
    </div>;
}
