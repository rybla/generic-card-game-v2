/* eslint-disable @typescript-eslint/no-unused-vars */

import { Deck } from "@/ontology";
import styles from "./DeckView.module.css";

export default function CardView(props: { deck: Deck }) {
    return <div className={styles.DeckViewer}>
        {/* TODO: interactive UI for viewing a deck of game cards */}
    </div>;
}
