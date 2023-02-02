import { observer } from "mobx-react-lite";
import Dish from "../../models/DishModel/DishModel";
import styles from "./Bag.module.css";
import { useEffect, useState } from "react";
import BagStore from "../../Stores/BagStore";
import MenuStore from "../../Stores/MenuStore";
import Button, { Size } from "../Buttons/Button/Button";

export type BagProps = {
    closeModal: () => void;
};
function Bag({ closeModal }: BagProps) {
    const [bill, setBill] = useState(0);

    function Submit(){
        BagStore.clearBag()
        closeModal()
    }

    useEffect(() => {
        let list = Object.keys(BagStore.bagData.bag).map((id) => {
            return BagStore.bagData.bag[id] * MenuStore.getDishPriceById(id);
        });
        let totalBill = 0;
        for (let i of list) {
            totalBill += i;
        }
        setBill(totalBill);
    }, []);
    return (
        <div className={styles.container}>
            
            <div className={styles.containerOfDishes}>
            <h1>Your order</h1>
                <div className={styles.containerOfDish}>
                    <span className={styles.headerOfContainer}>
                        Name of Dish
                    </span>
                    <span className={styles.headerOfContainer}>
                        Amount and price
                    </span>
                    <span className={styles.headerOfContainer}>Total</span>
                </div>
                {Object.keys(BagStore.bagData.bag).map((id) => {
                    return (
                        <div className={styles.containerOfDish} key={id}>
                            <span className={styles.name}>
                                {MenuStore.getDishNameById(id)}
                            </span>
                            <span className={styles.amountAndPrice}>
                                {BagStore.bagData.bag[id]} x{" "}
                                {MenuStore.getDishPriceById(id)}€
                            </span>
                            <span className={styles.total}>
                                {BagStore.bagData.bag[id] *
                                    MenuStore.getDishPriceById(id)}
                                €
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className={styles.totalContainer}>
                <span>Total <b className={styles.bill}> {`${bill}`}€</b></span>
                <Button action={() => Submit()} filled size={Size.Medium}>Sumbit</Button>
            </div>
        </div>
    );
}

export default observer(Bag);
