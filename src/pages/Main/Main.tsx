import styles from "./Main.module.css";
import { useEffect, useState } from "react";
import Dish from "../../models/DishModel/DishModel";
import ListOfDishes from "../../components/ListOfDishes/ListOfDishes";
import { observer } from "mobx-react-lite";
import MenuStore from "../../Stores/MenuStore";

function Main() {
    const [dishList, setDishList] = useState<Dish[] | null>(null);
    useEffect(() => {
       

        fetch(
            "https://restaurant-task-server.onrender.com/getDishes"
        ).then((response) => response.json())
        .then((data) => {
            MenuStore.setMenuData(data.data);
        })
        
        
       
    }, []);

    return (
        <main className={styles.main}>
            <article className={styles.article}>
                <h2 className={styles.h}>Breakfast</h2>
                {MenuStore.menuData.menu ? (
                    <ListOfDishes
                        dishes={[...MenuStore.menuData.menu].filter((el) => {
                            return el.mealTimeType === "breakfast";
                        })}
                    />
                ) : (
                    <></>
                )}
            </article>

            <article className={styles.article}>
                <h2 className={styles.h}>Lunch</h2>
                {MenuStore.menuData.menu ? (
                    <ListOfDishes
                        dishes={[...MenuStore.menuData.menu].filter((el) => {
                            return el.mealTimeType === "lunch";
                        })}
                    />
                ) : (
                    <></>
                )}
            </article>
            <article className={styles.article}>
                <h2 className={styles.h}>Dinner</h2>
                {MenuStore.menuData.menu ? (
                    <ListOfDishes
                        dishes={[...MenuStore.menuData.menu].filter((el) => {
                            return el.mealTimeType === "dinner";
                        })}
                    />
                ) : (
                    <></>
                )}
            </article>
            <article className={styles.article}>
                <h2 className={styles.h}>Drinks</h2>
                {MenuStore.menuData.menu ? (
                    <ListOfDishes
                        dishes={[...MenuStore.menuData.menu].filter((el) => {
                            return el.mealTimeType === "drinks";
                        })}
                    />
                ) : (
                    <></>
                )}
            </article>
            <article className={styles.article}>
                <h2 className={styles.h}>Other</h2>
                {MenuStore.menuData.menu ? (
                    <ListOfDishes
                        dishes={[...MenuStore.menuData.menu].filter((el) => {
                            return el.mealTimeType === "other";
                        })}
                    />
                ) : (
                    <></>
                )}
            </article>
        </main>
    );
}

export default observer(Main);
