import { observer } from "mobx-react-lite";
import styles from "./Header.module.css";

function Header() {
    return (
        <nav className={styles.container}>
            <ul>
                <li className={styles.logo}>Movies point</li>
                <li>
                    <a href="/movies/1" className={styles.link}>
                        Movies
                    </a>
                </li>
                <li>
                    <a href="/profile" className={styles.link}>
                        Profile
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default observer(Header);
