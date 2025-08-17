"use client";

import { useState } from "react";
import { Deck } from "@/ontology";
import styles from "./page.module.css";
import DeckView from "@/component/DeckView";
import Header from "@/component/Header";

export default function Page() {
    const [deck, setDeck] = useState<Deck | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result;
                if (typeof content !== "string") {
                    throw new Error("Failed to read file content.");
                }
                const json: unknown = JSON.parse(content);
                const parsedDeck = Deck.safeParse(json);

                if (parsedDeck.success) {
                    setDeck(parsedDeck.data);
                    setError(null);
                } else {
                    setError("Invalid deck file format.");
                    setDeck(null);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to parse JSON file.");
                setDeck(null);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={styles.Page}>
            <Header subtitle="deck viewer" />
            <div className={styles.deck}>
                <input type="file" accept=".json" onChange={handleFileChange} />
                {error && <p className={styles.error}>{error}</p>}
                {deck && <DeckView deck={deck} />}
            </div>
        </div>
    );
}
