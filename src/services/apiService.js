import axios from "axios";
//import { useDispatch } from "react-redux";
//import { setPasswordError, setUserError } from "../slices/authSlice";
import { setError } from "../slices/authSlice";

const API_URL = "http://localhost:3001/api/v1";

//Call API pour authentifer l'utilisateur
export const loginUser = async (email, password) => {
	//const dispatch = useDispatch();
	try {
		const response = await axios.post(
			`${API_URL}/user/login`,
			{
				//Un objet contenant les données à envoyer avec la requête.
				email,
				password,
			},
			{
				// Un objet contenant les en-têtes HTTP à envoyer avec la requête.
				headers: {
					"Content-Type": "application/json", //indiquer au serveur que les données envoyées sont en JSON
				},
			}
		);
		const { token } = response.data.body;
		console.log("loginUser", response.data);
		console.log("token", token);
		console.log("Login successful!", response.data);
		return response.data;
	} catch (error) {
		//throw error;
		console.log("err", error.message);
		/*if (error.response) {
			setError(error.response.data.message);
		} else {
			setError("Une erreur s'est produite. Veuillez réessayer.");
		}*/

		/*if (error.response && error.response.status === 404) {
			throw new Error(`Login failed: user not found. Status code: ${error.response.status}`);
		} else {
			throw new Error("Login failed: unknown error occurred.");
		}*/
		//throw new Error(`Login failed: unknown error occurred ${error.message}`);

		if (error.response && error.response.status === 400) {
			const errorMessage = error.response.data.message;
			console.log("errorMessage", errorMessage);
			if (errorMessage.includes("User not found")) {
				throw new Error("Incorrect user name.");
			} else if (errorMessage.includes("Password is invalid")) {
				throw new Error("Incorrect password");
			}
		} else {
			throw new Error(`Login failed: unknown error occurred ${error.message}`);
		}
	}
};

//Call API pour récupérer le profil utilisateur
export const fetchUserProfile = async (token) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/profile`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Ajouter le jeton d'authentification dans les en-têtes
				},
			}
		);

		return response.data;
	} catch (error) {
		throw new Error(`Failed to get user profile: ${error.message}`);
	}
};

//Call  API pour mettre à jour le profil utilisateur : firstName et lastName
export const updateUserProfile = async (token, firstName, lastName) => {
	//utiliser Axios pour envoyer une requête PUT à l'URL ${API_URL}/user/profile,
	// avec les données de mise à jour du profil utilisateur (prénom et nom) et le token d'authentification.
	try {
		const response = await axios.put(
			`${API_URL}/user/profile`,
			{
				// Un objet contenant les données à envoyer avec la requête PUT.
				firstName,
				lastName,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Utiliser pour inclure le token d'authentification dans la requête.
				},
			}
		);

		return response.data;
	} catch (error) {
		throw new Error(`Error during PUT request: ${error.message}`);
	}
};
