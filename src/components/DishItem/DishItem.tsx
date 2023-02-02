import Dish from "../../models/DishModel/DishModel";
import styles from "./DishItem.module.css";
import TabButton from "../Buttons/TabButton/TabButton";
import { useState } from "react";
import AppStore from "../../Stores/AppStore";
import Button from "../Buttons/Button/Button";
import Modal from "../Modal/Modal";
import TextInput from "../FormElements/TextInput/TextInput";
import { observer } from "mobx-react-lite";
import MenuStore from "../../Stores/MenuStore";
import { Size } from "../Buttons/Button/Button";
import BagStore from "../../Stores/BagStore";
import DishEditOrAdd from "../DishEditOrAdd/DishEditOrAdd";

type DishProps = {
    dish: Dish;
};

function DishItem({ dish }: DishProps) {
    const [amount, setAmount] = useState(0);
    const [showing, setShowing] = useState(false);
    const [name, setName] = useState(dish.name);
    const [description, setDescription] = useState(dish.description);
    const [mass, setMass] = useState(dish.mass);
    const [type, setType] = useState(dish.type);
    const [price, setPrice] = useState(dish.price);



    return (
        <div className={styles.dish}>
            <div className={styles.textConteiner}>
                <div className={styles.containerForButton}>
                    <span className={styles.name}>{dish.name}</span>
                    {AppStore.userData.isLoggedIn ? (
                        <Button action={() => setShowing(true)}>Edit</Button>
                    ) : (
                        <TabButton
                            action={() => {
                                setAmount(amount + 1);
                                BagStore.setBagData(dish._id);
                            }}
                        />
                    )}
                </div>
                <span className={styles.description}>{dish.description}</span>
            </div>
            <div className={styles.container}>
                <span className={styles.mass}>
                    {dish.type === "dish" ? `${dish.mass}g` : `${dish.mass}ml`}
                </span>
                <span className={styles.price}>{dish.price}€</span>
            </div>

            {BagStore.bagData.bag[dish._id] > 0 ? (
                <span className={styles.amount}>
                    {BagStore.bagData.bag[dish._id]}
                </span>
            ) : (
                <></>
            )}
            <Modal isShowing={showing} closeModal={() => setShowing(false)}>
                <DishEditOrAdd
                    closeModal={() => setShowing(false)}
                    dish={dish}
                />
            </Modal>
        </div>
    );
}

export default observer(DishItem);
