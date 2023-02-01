import styles from "./ListOfDishes.module.css";

import { v4 } from "uuid";
import Dish from "../../models/DishModel/DishModel";
import DishItem from '../DishItem/DishItem';
import { observer } from "mobx-react-lite";

type HorizontalListProps = {
    wrap?: boolean;
    dishes: Dish[];
};

function ListOfDishes({
    dishes,
    wrap = false,
}: HorizontalListProps) {
    let styleList = [styles.list];
    if (wrap) {
        styleList.push(styles.wrap);
    }

    return (
        <div className={styleList.join(" ")}>
            {dishes ? (
                dishes?.map((el) => (
                    <div key={v4()} className={styles.item}>
                        <DishItem dish={el} />
                    </div>
                ))
            ) : (
                <>Loading</>
            )}
        </div>
    );
}

export default observer(ListOfDishes)
