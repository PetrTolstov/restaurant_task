import styles from "./Main.module.css";
import { useEffect, useState } from "react";
import Dish from "../../models/DishModel/DishModel";
import ListOfDishes from "../../components/ListOfDishes/ListOfDishes";
import { observer } from "mobx-react-lite";
import MenuStore from "../../Stores/MenuStore";

function Main() {
    const [dishList, setDishList] = useState<Dish[] | null>(null);
    useEffect(() => {
        let list = [];
        list.push(
            new Dish(
                `21211`,
                `Name `,
                3,
                `Description`,
                3,
                "dish",
                "lunch"
            )
        );
        for (let i = 0; i < 30; i++) {
            list.push(
                new Dish(
                    `${i}`,
                    `Name ${i}`,
                    i,
                    `Description ${i}`,
                    i + i,
                    "dish",
                    "breakfast"
                )
            );
        }
        MenuStore.setMenuData(list)
        
    }, []);

    return (
        <main className={styles.main}>
            <article className={styles.article}>
                <h2 className={styles.h}>Breakfast</h2>
                {MenuStore.menuData.menu ? <ListOfDishes dishes={[...MenuStore.menuData.menu].filter((el)=> {
                    return el.mealTimeType === "breakfast"
                })} /> : <></>}
            </article>

            <article className={styles.article}>
                <h2 className={styles.h}>Lunch</h2>
                {MenuStore.menuData.menu ? <ListOfDishes dishes={[...MenuStore.menuData.menu].filter((el)=> {
                    return el.mealTimeType === "lunch"
                })} /> : <></>}
            </article>

        </main>
    );
}

export default observer(Main);
