import styles from "./Main.module.css";
import { useEffect, useState } from "react";
import Dish from "../../models/DishModel/DishModel";
import ListOfDishes from "../ListOfDishes/ListOfDishes";

function Main() {
    const [dishList, setDishList] = useState<Dish[] | null>(null);
    useEffect(() => {
        let list = [];
        for (let i = 0; i < 30; i++) {
            list.push(
                new Dish(
                    `${i}`,
                    `Name ${i}`,
                    i,
                    `Description ${i}`,
                    i + i,
                    "dish"
                )
            );
        }
        setDishList(list);
    }, []);

    return (
        <main className={styles.main}>
            <h2 className={styles.h}>Breakfast</h2>
            {dishList ? <ListOfDishes dishes={dishList} /> : <></>}
        </main>
    );
}

export default Main;
