import { Deck } from "@/ontology";
import CardView from "./CardView";
import styles from "./DeckView.module.css";

export default function DeckView(props: { deck: Deck }) {
    return (
        <div className={styles.DeckViewer}>
            <h2>{props.deck.name}</h2>
            <div className={styles.CardGrid}>
                {props.deck.cards.map((card, index) => (
                    <CardView key={index} card={card} />
                ))}
            </div>
        </div>
    );
}
