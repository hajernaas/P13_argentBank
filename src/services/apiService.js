import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";
//const api = axios.create({ baseURL: API_URL });
axios.defaults.headers.common["accept"] = `application/json`;
axios.defaults.headers.common["Content-Type"] = `application/json`;

export const loginUser = async (email, password) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/login`,
			{
				email,
				password,
			},
			{
				/*headers: {
					"Content-Type": "application/json",
				},*/
			}
		);

		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 404) {
			throw new Error(`Login failed: user not found. Status code: ${error.response.status}`);
		} else {
			throw new Error("Login failed: unknown error occurred.");
		}
	}
};

export const fetchUserProfile = async (token) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/profile`,
			{},
			{
				headers: {
					//"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		throw new Error("Connection problem");
	}
};

export const updateUserProfile = async (token, firstName, lastName) => {
	try {
		const response = await axios.put(
			`${API_URL}/user/profile`,
			{
				firstName,
				lastName,
			},
			{
				headers: {
					//"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		} else {
			throw new Error(`Erreur ${response.status}: ${response.statusText}`);
		}
	} catch (error) {
		throw new Error(`Erreur lors de la requête PUT: ${error.message}`);
	}
};
