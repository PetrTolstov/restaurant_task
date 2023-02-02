import { observer } from "mobx-react-lite";
import styles from "./Header.module.css";
import Restaurant from "../../pages/Restaurant/Restaurant";
import Button, { Size } from "../Buttons/Button/Button";
import { useState } from "react";
import Modal from "../Modal/Modal";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import AppStore from "../../Stores/AppStore";
import BagStore from "../../Stores/BagStore";
import Bag from "../Bag/Bag";
import Confetti from "react-confetti";
import TabButton from "../Buttons/TabButton/TabButton";
import DishEditOrAdd from "../DishEditOrAdd/DishEditOrAdd";
import Dish from "../../models/DishModel/DishModel";

function Header() {
    const [showing, setShowing] = useState(false);
    const [showingBag, setShowingBag] = useState(false);
    const [showingDishAdding, setShowingDishAdding] = useState(false);
    const [animate, setAnimate] = useState(false);
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.h}>Restaurant Menu</h1>
                <div className={styles.buttons}>
                    {AppStore.userData.isLoggedIn ? (
                        <>
                            <TabButton
                                action={() => {
                                    setShowingDishAdding(true);
                                }}
                            />
                            <Button
                                action={() => {
                                    localStorage.setItem('isLoggedIn', 'false') 
                                    AppStore.setIsLoggedIn(false);
                                    window.location.reload();
                                }}
                                size={Size.Small}
                            >
                                LogOut
                            </Button>
                        </>
                    ) : (
                        <>
                            <div
                                className={styles.bag}
                                onClick={() => setShowingBag(true)}
                            >
                                <img src="shopping-bag.svg" alt="" />
                                {BagStore.getAmountBagData > 0 ? (
                                    <span className={styles.amount}>
                                        {BagStore.getAmountBagData}
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <Button
                                action={() => setShowing(true)}
                                size={Size.Small}
                            >
                                LogIn
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <Modal isShowing={showing} closeModal={() => setShowing(false)}>
                <RegistrationForm closeModal={() => setShowing(false)} />
            </Modal>
            <Modal
                isShowing={showingBag}
                closeModal={() => setShowingBag(false)}
            >
                <Bag
                    closeModal={() => {
                        setAnimate(true);
                        setShowingBag(false);
                    }}
                />
            </Modal>

            <Modal
                isShowing={showingDishAdding}
                closeModal={() => setShowingDishAdding(false)}
            >
                <DishEditOrAdd
                    dish={new Dish("", "", 0, "", 0, "dish", "breakfast")}
                    closeModal={() => setShowingDishAdding(false)}
                />
            </Modal>

            {animate ? (
                <Confetti
                    run={animate}
                    recycle={false}
                    numberOfPieces={300}
                    onConfettiComplete={() => setAnimate(false)}
                />
            ) : (
                <></>
            )}
        </header>
    );
}

export default observer(Header);
