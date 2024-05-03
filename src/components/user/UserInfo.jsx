import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk, getToken, getLastName, getFirstName } from "../../slices/authSlice.js";
import { useState } from "react";
import Account from "./Account.jsx";

const UserInfo = () => {
	const dispatch = useDispatch();
	const authToken = useSelector(getToken);

	const firstNameUser = useSelector(getFirstName);
	const lastNameUser = useSelector(getLastName);

	const [firstName, setFirstName] = useState(firstNameUser);
	console.log("fist", firstName);
	const [lastName, setLastName] = useState(lastNameUser);
	console.log("last", lastName);

	const [editUser, setEditUser] = useState(false);

	const handleCancel = () => {
		// Réinitialiser les champs et revenir à la vue normale
		setEditUser(false);
		setFirstName(firstNameUser);
		setLastName(lastNameUser);
	};

	const handleSave = async () => {
		dispatch(updateUserThunk({ token: authToken, firstName, lastName }));
		setEditUser(false); // Revenir à la vue normale après la mise à jour
	};

	const updateName = async () => {
		setEditUser(true);
	};

	return (
		<main className="main bg-dark">
			{!editUser ? (
				<div className="header">
					<h1>
						Welcome back
						<br />
						{firstNameUser} {lastNameUser}
					</h1>
					<button className="edit-button" onClick={updateName}>
						Edit Name
					</button>
				</div>
			) : (
				<div className="header">
					<h1>Welcome back</h1>
					<div className="edit-form">
						<input
							className="edit-input"
							type="text"
							onChange={(e) => setFirstName(e.target.value)}
							placeholder={firstNameUser}
						/>
						<input
							className="edit-input"
							type="text"
							onChange={(e) => setLastName(e.target.value)}
							placeholder={lastNameUser}
						/>
						<div className="edit-buttons">
							<button className="cancel-button" onClick={handleCancel}>
								Cancel
							</button>
							<button className="save-button" onClick={handleSave}>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
			<Account />
		</main>
	);
};

export default UserInfo;
