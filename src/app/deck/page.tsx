import Header from "@/component/Header";
import styles from "./page.module.css";

export default function Page() {
    return (
        <div className={styles.Page}>
            <Header subtitle="deck viewer" />
            <div className={styles.deck}>{/* TODO: interactive deck view */}</div>
        </div>
    );
}
