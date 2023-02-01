import { observer } from "mobx-react-lite";
import styles from "./Header.module.css";
import Restaurant from "../../pages/Restaurant/Restaurant";
import Button, { Size } from "../Buttons/Button/Button";
import { useState } from "react";
import Modal from "../Modal/Modal";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import AppStore from "../../Stores/AppStore";

function Header() {
    const [showing, setShowing] = useState(false);
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.h}>Restaurant Menu</h1>
                <div className={styles.buttons}>
                    {AppStore.userData.isLoggedIn ? (
                        <Button
                            action={() => {
                                AppStore.setIsLoggedIn(false);
                                window.location.reload();
                            }}
                            size={Size.Small}
                        >
                            LogOut
                        </Button>
                    ) : (
                        <>
                            <img src="shopping-bag.svg" alt="" />

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
        </header>
    );
}

export default observer(Header);
