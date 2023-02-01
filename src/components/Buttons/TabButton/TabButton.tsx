import styles from "./tabbutton.module.css";

type TabButtonProps = {
    action: () => void;
};

export default function TabButton({ action }: TabButtonProps) {
    return (
        <button className={styles.TabButton} onClick={() => action()}>
            <img src="add-new.svg" alt="add" className={styles.img} />
        </button>
    );
}
