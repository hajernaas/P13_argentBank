import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk, getToken, getLastName, getFirstName } from "../../slices/authSlice.js";
import { useState } from "react";
import Account from "./Account.jsx";

const UserInfo = () => {
	const dispatch = useDispatch();
	const authToken = useSelector(getToken);
	const firstNameUser = useSelector(getFirstName);
	const lastNameUser = useSelector(getLastName);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [editUser, setEditUser] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const isValidUser = (name) => {
		// une expression régulière qui valide les prénoms et noms contenant uniquement des lettres (y compris les lettres accentuées), des espaces, '-' et '_':
		const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-_]+$/;
		return regex.test(name);
	};

	const handleCancel = () => {
		// Réinitialiser les champs et revenir à la vue normale
		setEditUser(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (firstName.length < 2 || lastName.length < 2) {
			setErrorMessage("First name and last name must be at least 2 characters long");
			return;
		}

		if (!isValidUser(firstName) || !isValidUser(lastName)) {
			setErrorMessage(
				"First and last names can only contain letters (including accented letters), spaces, '-' and '_'"
			);

			return;
		}

		if (authToken) {
			dispatch(updateUserThunk({ token: authToken, firstName, lastName }));
			setEditUser(false); // Revenir à la vue normale après la mise à jour
		}
	};

	const updateName = async () => {
		setEditUser(true);
		setErrorMessage("");
	};

	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					{firstNameUser} {lastNameUser}
				</h1>
				{!editUser ? (
					<button className="edit-button" onClick={updateName}>
						Edit Name
					</button>
				) : (
					<form className="edit-inputs-buttons" onSubmit={handleSubmit}>
						<div className="edit-form">
							<input
								className="edit-input"
								type="text"
								onChange={(e) => setFirstName(e.target.value)}
								placeholder={firstNameUser}
								required
							/>
							<input
								className="edit-input"
								type="text"
								onChange={(e) => setLastName(e.target.value)}
								placeholder={lastNameUser}
								required
							/>
							<div className="edit-buttons">
								<button className="cancel-button" type="reset" onClick={handleCancel}>
									Cancel
								</button>
								<button className="save-button" type="submit">
									Save
								</button>
							</div>
						</div>
						{errorMessage && <div className="error-message">{errorMessage}</div>}
					</form>
				)}
			</div>
			<Account />
		</main>
	);
};

export default UserInfo;
