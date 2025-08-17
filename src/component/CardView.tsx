import { Card } from "@/ontology";
import styles from "./CardView.module.css";

export default function CardView(props: { card: Card }) {
    return (
        <div className={styles.Card}>
            <h3>{props.card.name}</h3>
            <p>{props.card.content}</p>
        </div>
    );
}
