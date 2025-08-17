import Header from "@/component/Header";
import styles from "./page.module.css";

type Params = {
    gameId: string;
};

type Props = {
    params: Promise<Params>;
};

export default async function Page(props: Props) {
    const params = await props.params;

    return (
        <div className={styles.Page}>
            <Header subtitle={`game ${params.gameId}`} />
            <div className={styles.game}>
                {/* TODO: game view */}
            </div>
        </div>
    );
}
