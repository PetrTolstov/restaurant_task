import Button from "../Buttons/Button/Button";
import Dish from "../../models/DishModel/DishModel";
import styles from "./DishItem.module.css";
import TabButton from '../Buttons/TabButton/TabButton';
import { useState } from 'react';

type DishProps = {
    dish: Dish;
};

function DishItem({ dish }: DishProps) {
    const [filled, setFilled] = useState(false)
    return (
        <div className={styles.dish}>
            <div className={styles.textConteiner}>
                <div className={styles.containerForButton}>
                    <span className={styles.name}>{dish.name}</span>
                    <TabButton action={() => {console.log("Added")}} changeFilled={() => setFilled(true)}/>
                </div>
                <span className={styles.description}>{dish.description}</span>
            </div>
            <div className={styles.container}>
                <span className={styles.mass}>
                    {dish.type === "dish" ? `${dish.mass}g` : `${dish.mass}ml`}
                </span>
                <span className={styles.price}>{dish.price}€</span>
            </div>
        </div>
    );
}

export default DishItem;
