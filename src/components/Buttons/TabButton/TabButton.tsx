import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ButtonProps } from "../LikeButton/LikeButton";
import styles from "./tabbutton.module.css";

export default function TabButton({
    action,
    filled = false,
    changeFilled,
}: ButtonProps) {
    const [style, setStyle] = useState([styles.TabImgButton]);

    function LikeAction() {
        action();

        changeFilled(!filled);
    }

    useEffect(() => {
        if (filled) {
            if (!(styles.empty in style)) {
                setStyle([...style, styles.liked]);
            }
        } else {
            setStyle(
                style.filter((element) => {
                    return element != styles.liked;
                })
            );
        }
    }, [filled]);

    return (
        <button className={styles.TabButton} onClick={() => LikeAction()}>
            <img src="add-new.svg" alt="add" className={styles.img}/>
        </button>
    );
}
