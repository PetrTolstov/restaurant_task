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
import { Size } from '../Buttons/Button/Button';

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
    
    function Submit(){
        const meal = new Dish(dish._id, name, price, description, mass, type, dish.mealTimeType)
        MenuStore.changeMenuData(dish._id, meal)
    }

    return (
        <div className={styles.dish}>
            <div className={styles.textConteiner}>
                <div className={styles.containerForButton}>
                    <span className={styles.name}>{dish.name}</span>
                    {AppStore.userData.isLoggedIn ? (
                        <Button action={() => setShowing(true)}>Edit</Button>
                    ) : (
                        <TabButton action={() => setAmount(amount + 1)} />
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

            {amount > 0 ? (
                <span className={styles.amount}>{amount}</span>
            ) : (
                <></>
            )}
            <Modal isShowing={showing} closeModal={() => setShowing(false)}>
                <TextInput
                    value={name}
                    placeholder={"Name"}
                    onChange={(newValue) => setName(newValue)}
                />
                <TextInput
                    value={description}
                    placeholder={"Description"}
                    onChange={(newValue) => setDescription(newValue)}
                />
                <TextInput
                    value={`${price}`}
                    placeholder={"Price"}
                    onChange={(newValue) => setPrice(parseInt(newValue))}
                />
                <div className={styles.container}>
                    <input
                       
                        defaultValue={mass.toString()}
                        placeholder={"Mass"}
                        onChange={(newValue) =>
                            setMass(parseInt(newValue.currentTarget.value))
                        }
                    />
                
                    <select
                       
                        onChange={(e) => {
                            if (
                                e.currentTarget.value === "drink" ||
                                e.currentTarget.value === "dish"
                            ) {
                                setType(e.currentTarget.value);
                            }
                        }}
                        defaultValue={type === "drink" ? "drink" : "dish"}
                    >
                        
                            <>
                                <option value={"drink"}>
                                    ml
                                </option>
                                <option value={"dish"}>g</option>
                            </>
                        
                    </select>
                </div>
                <div className={styles.buttons}>
                    <Button action={() => MenuStore.deleteMenuItem(dish._id)} size={Size.Medium}>Delete</Button>
                    <Button isSubmit action={() => Submit()} filled size={Size.Medium}>Submit</Button>
                </div>
            </Modal>
        </div>
    );
}

export default observer(DishItem);
