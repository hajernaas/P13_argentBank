import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, fetchUserProfile, updateUserProfile } from "../services/apiService.js";
//import { useDispatch } from "react-redux";
//import { handleMessage } from "../components/login/Connection.jsx";

// Utiliser la méthode loginUser pour envoyer une requête POST avec les données email et password

export const loginThunk = createAsyncThunk(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		//const dispatch = useDispatch();
		try {
			const data = await loginUser(email, password);
			console.log("yyy", data);
			//En cas de succès, elle renvoie les données de la réponse.
			return data;
		} catch (error) {
			//En cas d'erreur, elle rejette la thunk avec les données d'erreur de la réponse.(Propage l'erreur au store Redux (authSlice))
			console.log("error", rejectWithValue(error.message));
			/*const message = error.response.data.message;
			console.log("message", message);
			dispatch(handleMessage(message));*/
			//	throw new Error(message);
			return rejectWithValue(error.message);
		}
	}
);
/*
export const handleMessage = (message) => (dispatch) => {
	switch (message) {
		case "Error: Password is invalid":
			dispatch(setPasswordError(message.split("Error: ")[1]));
			dispatch(setUserError(null));
			break;
		case "Error: User not found!":
			dispatch(setUserError(message.split("Error: ")[1]));
			dispatch(setPasswordError(null));
			break;
		case "User successfully logged in":
			dispatch(setUserError(null));
			dispatch(setPasswordError(null));
			break;
		default:
			break;
	}
};*/

//Cette fonction récupère les informations de l'utilisateur
// et le jeton actuel de l'état du Redux store dans le cas de succées de connexion
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
			console.log("dataUpdate", data);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	//Définir l'état initial de la tranche d'authentification dans le Redux store.  Cet état inclut le statut d'authentification de l'utilisateur,
	//le statut pour suivre l'état de la requête, la gestion des erreurs,le jeton et les informations de l'utilisateur
	isConnected: false,
	token: localStorage.getItem("token") || sessionStorage.getItem("token") || null,
	email: null,
	firstName: null,
	lastName: null,
	status: null,
	error: null,
	userError: null,
	passwordError: null,
	successMessage: null,
	// Récupèrer la valeur associée à "rememberMe" dans le stockage local et de déterminer si cette option a été activée
	rememberMe: localStorage.getItem("rememberMe") === "true",
};
console.log("initialState", initialState);

// créer notre slice d'état authSlice , ce qui permet d’organiser l’état en morceaux autonomes
//et gérables qui gère l'état lié à l'authentification des utilisateurs.
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Ce réducteur réinitialise l'état de la tranche d'authentification à l'état initial.
		logout(state) {
			state.isConnected = false;
			state.token = null;
			state.status = null;
			state.email = null;
			state.firstName = null;
			state.lastName = null;
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
			state.error = null;
			state.successMessage = null;
		},

		setToken: (state, action) => {
			state.token = action.payload;
		},
		clearToken: (state) => {
			state.token = null;
		},
		//cette fonction permet de basculer l'état de l'option "RememberMe" entre activé et désactivé,
		//et de sauvegarder ce choix dans le  navigateur
		toggleRememberMe(state) {
			state.rememberMe = !state.rememberMe;
			localStorage.setItem("rememberMe", state.rememberMe);
		},

		loginSuccess: (state, action) => {
			state.firstName = action.payload.body.firstName;
			state.lastName = action.payload.body.lastName;
			state.isConnected = true;
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.firstName = null;
			state.lastName = null;
			state.isConnected = false;
			state.error = action.payload;
		},
		setUserError: (state, action) => {
			state.userError = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setPasswordError: (state, action) => {
			state.passwordError = action.payload.error;
		},
		setIsAuthenticated: (state, action) => {
			state.isConnected = action.payload;
		},
		clearErrors: (state) => {
			/*state.userError = null;
			state.passwordError = null;*/
			state.error = null;
		},

		clearSuccessMessage: (state) => {
			state.successMessage = null;
		},
	},

	//Ces réducteurs gèrent les états de réussite et d'échec des thunks asynchrones
	extraReducers: (builder) => {
		builder.addCase(loginThunk.fulfilled, (state, action) => {
			state.token = action.payload.body.token;
			state.isConnected = true;
			state.status = "succeeded";
			state.successMessage = "User successfully logged in";
			//localStorage.setItem("token", action.payload.body.token);
			if (state.rememberMe) {
				localStorage.setItem("token", action.payload.body.token);
			} else {
				sessionStorage.setItem("token", action.payload.body.token);
			}
		});
		builder.addCase(loginThunk.rejected, (state, action) => {
			state.status = "failed";
			state.isConnected = false;
			state.error = action.payload;
			state.successMessage = null;
		});
		builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
			state.firstName = action.payload.body.firstName;
			state.lastName = action.payload.body.lastName;
			state.email = action.payload.body.email;
			state.status = "succeeded";
		});
		/*builder.addCase(fetchUserThunk.rejected, (state, action) => {
			return initialState;
		});*/

		builder.addCase(updateUserThunk.fulfilled, (state, action) => {
			state.firstName = action.payload.body.firstName;
			state.lastName = action.payload.body.lastName;
			state.status = "succeeded";
		});

		builder.addCase(updateUserThunk.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	},
});

//Exporter des actions créés par createSlice qui peuvent être utilisées dans les composants afin d'envoyer des informations .
export const {
	logout,
	setToken,
	clearToken,
	toggleRememberMe,
	loginSuccess,
	loginFailure,
	setUserError,
	setPasswordError,
	clearErrors,
	setError,
	clearSuccessMessage,
} = authSlice.actions;
console.log("authSlice.actions", authSlice.actions);

// Exporter authSlice  qui sera utilisé par le store
export default authSlice.reducer;

// Sélecteurs
export const IsAuth = (state) => state.auth.isConnected;
export const getToken = (state) => state.auth.token;
export const isRememberMe = (state) => state.auth.rememberMe;
export const getFirstName = (state) => state.auth.firstName;
export const getLastName = (state) => state.auth.lastName;
export const getUserError = (state) => state.auth.userError;
export const getpasswordError = (state) => state.auth.passwordError;
export const errorUser = (state) => state.auth.error;
export const getStatus = (state) => state.auth.status;
export const getSuccessMessage = (state) => state.auth.successMessage;
console.log("getUserError", getUserError);
