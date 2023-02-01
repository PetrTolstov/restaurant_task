import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import AppStore from "../../Stores/AppStore";

import Button, { Size } from "../Buttons/Button/Button";
import TextInput from "../FormElements/TextInput/TextInput";

import styles from "./RegistrationForm.module.css";
import Response from "../../models/ResponseModel/ResponseModel";
import { User } from "../../models/UserModel/UserModel";

export type RegistrationFormProps = {
    closeModal: () => void;
};
function RegistrationForm({ closeModal }: RegistrationFormProps) {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        fetch("https://restaurant-task-server.onrender.com/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data);
                    AppStore.setUserData(
                        new User(userData.email, userData.password)
                    );
                    AppStore.setIsLoggedIn(true);
                    closeModal();
                } else {
                    console.log(data);
                    alert("Some error with entaring");
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={styles.container}>
            <h1>Welcome back</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Email"
                    onChange={(value) => {
                        setUserData((prevState) => {
                            const copy = { ...prevState };
                            copy.email = value;
                            return copy;
                        });
                    }}
                />
                <TextInput
                    isSecure
                    placeholder="Password"
                    onChange={(value) => {
                        setUserData((prevState) => {
                            const copy = { ...prevState };
                            copy.password = value;
                            return copy;
                        });
                    }}
                />
                {loading ? (
                    <p>Loading</p>
                ) : (
                    <Button isSubmit size={Size.Large} filled action={() => {}}>
                        Log In
                    </Button>
                )}
            </form>
        </div>
    );
}

export default observer(RegistrationForm);
