import { observer } from "mobx-react-lite";
import styles from "./Header.module.css";
import Restaurant from "../../pages/Restaurant/Restaurant";
import Button, { Size } from "../Buttons/Button/Button";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.h}>Restaurant Menu</h1>
                <Button action={() => console.log("login")} size={Size.Medium}>LogIn</Button>
            </div>
        </header>
    );
}

export default observer(Header);
