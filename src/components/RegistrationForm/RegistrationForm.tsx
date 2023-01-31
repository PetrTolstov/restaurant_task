import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";

import Button, { Size } from "../Buttons/Button/Button";
import TextInput from "../FormElements/TextInput/TextInput";

import styles from "./RegistrationForm.module.css";

export type RegistrationFormProps = {
	closeModal: () => void;
};
function RegistrationForm({ closeModal }: RegistrationFormProps) {
	const [userData, setUserData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        setLoading(true)
		let loginUser: boolean = false;
        /*
		if (modalType === ModalType.login) {
			loginUser = true;
		}
		
		if (AppStore.userData.isLoggedIn) {
            AppStore.ShowConfetti(true);
			await CheckIfLoggedIn();
			closeModal();
		}
        setLoading(false);
        */
	};

	return (
		<div className={styles.container}>
			<h1>Welcome back</h1>
			<form onSubmit={handleSubmit}>
				<TextInput
					placeholder='Email'
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
					placeholder='Password'
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
