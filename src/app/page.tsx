import Header from "@/component/Header";
import Lobby from "@/component/Lobby";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <Header subtitle={"index"} />
            <Lobby />
        </div>
    );
}
