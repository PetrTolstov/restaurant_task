import Button from "../../components/Buttons/Button/Button";
import TabButton from "../../components/Buttons/TabButton/TabButton";
import Dish from "../../models/DishModel/DishModel";
import styles from "./DishItem.module.css";

type DishProps = {
    dish: Dish;
};

function DishItem({ dish }: DishProps) {
    return (
        <div className={styles.dish}>
            <div className={styles.textConteiner}>
                <div className={styles.containerForButton}>
                    <span className={styles.name}>{dish.name}</span>
                    <Button action={() => {console.log("Added")}}>Add</Button>
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
