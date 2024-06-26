//Représente une tranche de l'état de notre application pour l'authentification de l'utilisateur
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, fetchUserProfile, updateUserProfile } from "../services/apiService.js";

// Utiliser la méthode loginUser pour envoyer une requête POST avec les données email et password
export const loginThunk = createAsyncThunk(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const data = await loginUser(email, password);
			//En cas de succès, elle renvoie les données de la réponse.
			return data;
		} catch (error) {
			//En cas d'erreur, elle rejette la thunk avec les données d'erreur de la réponse.(Propage l'erreur au store Redux (authSlice))
			return rejectWithValue(error.message);
		}
	}
);

//Cette fonction récupère les informations de l'utilisateur
//et le jeton actuel de l'état du Redux store dans le cas de succées de connexion
export const fetchUserThunk = createAsyncThunk(
	"auth/fetchUser",
	async (token, { rejectWithValue }) => {
		try {
			const data = await fetchUserProfile(token);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

//Cette fonction modifie les informations de l'utilisateur.
//Elle utilise la fonction updateUserProfile pour envoyer une requête PUT avec les valeurs mises à jour de firstName , token et lastName
export const updateUserThunk = createAsyncThunk(
	"user/updateUserProfile",
	async ({ token, firstName, lastName }, { rejectWithValue }) => {
		try {
			const data = await updateUserProfile(token, firstName, lastName);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	//Définir l'état initial de la tranche d'authentification dans le Redux store.  Cet état inclut
	//les informations de l'utilisateur, la gestion des erreurs,le jeton d'authentification
	email: null,
	firstName: null,
	lastName: null,
	error: null,
	token: localStorage.getItem("token") || sessionStorage.getItem("token") || null,
	// Récupèrer la valeur associée à "rememberMe" dans le stockage local et de déterminer si cette option a été activée
	rememberMe: localStorage.getItem("rememberMe") === "true",
};

// créer notre slice d'état authSlice , ce qui permet d’organiser l’état en morceaux autonomes
//et gérables qui gère l'état lié à l'authentification des utilisateurs.
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Ce réducteur réinitialise l'état de la tranche d'authentification à l'état initial.
		logout(state) {
			state.token = null;
			state.email = null;
			state.firstName = null;
			state.lastName = null;
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
			localStorage.removeItem("firstname");
			state.error = null;
		},

		//cette fonction permet de basculer l'état de l'option "RememberMe" entre activé et désactivé,
		//et de sauvegarder ce choix dans le  navigateur
		toggleRememberMe(state) {
			state.rememberMe = !state.rememberMe;
			localStorage.setItem("rememberMe", state.rememberMe);
		},

		clearErrors: (state) => {
			state.error = null;
		},
	},

	//Ces réducteurs gèrent les états de réussite et d'échec des thunks asynchrones
	extraReducers: (builder) => {
		builder.addCase(loginThunk.fulfilled, (state, action) => {
			state.token = action.payload.body.token;
			if (state.rememberMe) {
				localStorage.setItem("token", action.payload.body.token);
			} else {
				sessionStorage.setItem("token", action.payload.body.token);
			}
		});
		builder.addCase(loginThunk.rejected, (state, action) => {
			state.error = action.payload;
		});

		builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
			state.firstName = action.payload.body.firstName;
			state.lastName = action.payload.body.lastName;
			state.email = action.payload.body.email;
			localStorage.setItem("firstname", action.payload.body.firstName);
		});
		builder.addCase(fetchUserThunk.rejected, (state, action) => {
			state.error = action.payload;
			return initialState;
		});

		builder.addCase(updateUserThunk.fulfilled, (state, action) => {
			state.firstName = action.payload.body.firstName;
			state.lastName = action.payload.body.lastName;
		});

		builder.addCase(updateUserThunk.rejected, (state, action) => {
			state.error = action.payload;
		});
	},
});

//Exporter des actions créés par createSlice qui peuvent être utilisées dans les composants afin d'envoyer des informations .
export const { logout, toggleRememberMe, clearErrors } = authSlice.actions;

// Exporter authSlice qui sera utilisé par le store
export default authSlice.reducer;

// Exporter des Sélecteurs pour l'extraction spécifique de partie de l'état d'authentification
export const getToken = (state) => state.auth.token;
export const isRememberMe = (state) => state.auth.rememberMe;
export const getFirstName = (state) => state.auth.firstName;
export const getLastName = (state) => state.auth.lastName;
export const getError = (state) => state.auth.error;
