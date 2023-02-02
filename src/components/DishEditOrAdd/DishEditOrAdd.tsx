import { observer } from "mobx-react-lite";
import styles from "./DishEditOrAdd.module.css";
import { useEffect, useState } from "react";
import BagStore from "../../Stores/BagStore";
import MenuStore from "../../Stores/MenuStore";
import Button, { Size } from "../Buttons/Button/Button";
import Dish from "../../models/DishModel/DishModel";
import TextInput from "../FormElements/TextInput/TextInput";

export type BagProps = {
    dish: Dish;
    closeModal: () => void;
};
function DishEditOrAdd({ dish, closeModal }: BagProps) {
    const [name, setName] = useState(dish.name);
    const [description, setDescription] = useState(dish.description);
    const [mass, setMass] = useState(dish.mass);
    const [type, setType] = useState(dish.type);
    const [mealTimeType, setMealTimeType] = useState(dish.mealTimeType);
    const [price, setPrice] = useState(dish.price);

    function defaultMealTimeType() {
        switch (mealTimeType) {
            case "breakfast":
                return "breakfast";
            case "lunch":
                return "lunch";
            case "dinner":
                return "dinner";
            case "drinks":
                return "drinks";
            case "other":
                return "other";
        }
    }

    function Submit() {
        let meal = {
            name: name,
            price: price,
            description: description,
            mass: mass,
            type: type,
            mealTimeType: mealTimeType,
        };
        let req = {}
        let reqPath = ''
        if(dish._id){
            req = {
                updatedDish : meal,
                _id: dish._id
            }
            reqPath = "updateDish"
        }else{
            req = {
                newDish : meal
            }
            reqPath = "createDish"
        }

        fetch(
            `https://restaurant-task-server.onrender.com/protected/dishes/${reqPath}`,
            {
                method: "POST",
                body: JSON.stringify(req),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    if(dish._id){
                        MenuStore.changeMenuData(new Dish(dish._id, meal.name, meal.price, meal.description, meal.mass, meal.type, meal.mealTimeType));
                    }else{
                        MenuStore.pushDishInMenu(new Dish(data.data._id, meal.name, meal.price, meal.description, meal.mass, meal.type, meal.mealTimeType));
                    }

                    closeModal();
                } else {
                    console.log(data);
                    alert("Some error with meal");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
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

            <label>Mass</label>
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
                        <option value={"drink"}>ml</option>
                        <option value={"dish"}>g</option>
                    </>
                </select>
            </div>
            <div className={styles.container}>
            <select
            className={styles.selectMeal}
                onChange={(e) => {
                    if (
                        e.currentTarget.value === "breakfast" ||
                        e.currentTarget.value === "lunch" ||
                        e.currentTarget.value === "dinner" ||
                        e.currentTarget.value === "drinks" ||
                        e.currentTarget.value === "other"
                    ) {
                        setMealTimeType(e.currentTarget.value);
                    }
                }}
                defaultValue={defaultMealTimeType()}
            >
                <>
                    <option value={"breakfast"}>Breakfast</option>
                    <option value={"lunch"}>Lunch</option>
                    <option value={"dinner"}>Dinner</option>
                    <option value={"drinks"}>Drinks</option>
                    <option value={"other"}>Other</option>
                </>
            </select>
            </div>
            <div className={styles.buttons}>
                <Button
                    action={() => {
                        MenuStore.deleteMenuItem(dish._id);
                        closeModal();
                    }}
                    size={Size.Medium}
                >
                    Delete
                </Button>
                <Button
                    isSubmit
                    action={() => Submit()}
                    filled
                    size={Size.Medium}
                >
                    Submit
                </Button>
            </div>
        </>
    );
}

export default observer(DishEditOrAdd);
