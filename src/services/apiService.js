//ce code utilise axios pour effectuer des requêtes HTTP
import axios from "axios";
const API_URL = "http://localhost:3001/api/v1";

//Call API pour authentifer l'utilisateur
export const loginUser = async (email, password) => {
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

		if (response.status === 200) {
			console.log("Login successful!");
			console.log("Response Data:", response.data);
			return response.data;
		} else {
			throw new Error("Unexpected status code: " + response.status);
		}
	} catch (error) {
		if (error.response) {
			const statusCode = error.response.status;
			switch (statusCode) {
				case 400:
					const errorMessage = error.response.data.message;
					if (errorMessage.includes("User not found")) {
						throw new Error("Incorrect username.");
					} else if (errorMessage.includes("Password is invalid")) {
						throw new Error("Incorrect password");
					} else {
						throw new Error("Login failed: " + errorMessage);
					}
				case 500:
					throw new Error("Internal server error.");
				default:
					throw new Error("Login failed: " + error.response.data.message);
			}
		} else {
			throw new Error("Login failed: " + error.message);
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
		if (response.status === 200) {
			console.log("User profile retrieved successfully!");
			console.log("Profile Data:", response.data);
			return response.data;
		} else {
			throw new Error("Unexpected status code: " + response.status);
		}
	} catch (error) {
		if (error.response) {
			const statusCode = error.response.status;
			switch (statusCode) {
				case 400:
					throw new Error("Bad request: " + error.response.data.message);
				case 500:
					throw new Error("Internal server error.");
				default:
					throw new Error("Failed to get user profile: " + error.response.data.message);
			}
		} else {
			throw new Error("Failed to get user profile: " + error.message);
		}
	}
};

//Call  API pour mettre à jour le profil utilisateur : firstName et lastName
export const updateUserProfile = async (token, firstName, lastName) => {
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

		if (response.status === 200) {
			console.log("User profile updated successfully!");
			console.log("Updated Profile Data:", response.data);
			return response.data;
		} else {
			throw new Error("Unexpected status code: " + response.status);
		}
	} catch (error) {
		if (error.response) {
			const statusCode = error.response.status;
			switch (statusCode) {
				case 400:
					throw new Error("Bad request: " + error.response.data.message);
				case 500:
					throw new Error("Internal server error.");
				default:
					throw new Error("Error during PUT request: " + error.response.data.message);
			}
		} else {
			throw new Error("Error during PUT request: " + error.message);
		}
	}
};
