import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	//Définir l'état initial. Cet état inclut le statut d'authentification de l'utilisateur, le jeton et les informations de l'utilisateur
	isConnected: false,
	token: null,
	user: null,
};

// créer notre slice d'état authSlice , ce qui permet d’organiser l’état en morceaux autonomes et gérables qui gère l'état lié à l'authentification des utilisateurs.
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Reducers pour modifier le state
		login: (state, action) => {
			// Appelé lorsqu'un utilisateur se connecte
			state.isConnected = true;
			state.token = action.payload.token; //Mettre à jour le token avec celui fourni dans l'action
			state.user = action.payload.user; // Mettre à jour les informations de l'utilisateur avec celles fournies dans l'action
		},
		logOut: (state) => {
			// Appelé lorsqu'un utilisateur se déconnecte
			state.isConnected = false;
			state.token = null;
			state.user = null;
		},
		updateProfile: (state, action) => {
			// Appelé pour mettre à jour les informations de l'utilisateur
			state.user = action.payload;
		},
	},
});

//
//Exporter des actions créés par createSlice qui peuvent être utilisées dans les composants afin d'envoyer des informations .
export const { logout, updateProfile, login } = authSlice.actions;

// Exporter authSlice  qui sera utilisé par le store
export default authSlice.reducer;

// Sélecteurs
export const IsAuth = (state) => state.auth.isAuth;
export const getUser = (state) => state.auth.user;
export const getToken = (state) => state.auth.token;
