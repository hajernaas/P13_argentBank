import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, fetchUserProfile, updateUserProfile } from "../services/apiService.js";

export const loginThunk = createAsyncThunk(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const data = await loginUser(email, password);
			console.log("yyy", data);
			return data;
		} catch (error) {
			//Propage l'erreur au store Redux (authSlice)
			console.log("error", rejectWithValue(error.message));
			return rejectWithValue(error.message);
		}
	}
);

export const fetchUserThunk = createAsyncThunk(
	"auth/fetchUser",
	async (token, { rejectWithValue }) => {
		try {
			const data = await fetchUserProfile(token);
			console.log("dddddd", data);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

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
	//Définir l'état initial. Cet état inclut le statut d'authentification de l'utilisateur, le jeton et les informations de l'utilisateur
	isConnected: false,
	token: localStorage.getItem("token"),
	email: null,
	firstName: null,
	lastName: null,
	status: null,
};
console.log("initialState", initialState);
// créer notre slice d'état authSlice , ce qui permet d’organiser l’état en morceaux autonomes et gérables qui gère l'état lié à l'authentification des utilisateurs.
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			state.isConnected = false;
			state.token = null;
			state.status = null;
			state.email = null;
			state.firstName = null;
			state.lastName = null;
			localStorage.removeItem("token");
		},
	},

	extraReducers: (builder) => {
		builder.addCase(loginThunk.fulfilled, (state, action) => {
			state.token = action.payload.body.token;
			state.isConnected = true;
			state.status = "succeeded";
			localStorage.setItem("token", action.payload.body.token);
		});
		builder.addCase(loginThunk.rejected, (state, action) => {
			state.status = "failed";
			state.isAuthenticated = false;
		});
		builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
			state.firstName = action.payload.body.firstName;
			state.lastName = action.payload.body.lastName;
			state.email = action.payload.body.email;
			state.status = "succeeded";
		});
		builder.addCase(fetchUserThunk.rejected, (state, action) => {
			return initialState;
		});

		builder.addCase(updateUserThunk.fulfilled, (state, action) => {
			state.firstName = action.payload.body.firstName;
			state.lastName = action.payload.body.lastName;
			state.status = "succeeded";
		});

		builder.addCase(updateUserThunk.rejected, (state, action) => {
			state.status = "failed";
		});
	},
});

//
//Exporter des actions créés par createSlice qui peuvent être utilisées dans les composants afin d'envoyer des informations .
export const { logout } = authSlice.actions;
console.log("authSlice.actions", authSlice.actions);

// Exporter authSlice  qui sera utilisé par le store
export default authSlice.reducer;

// Sélecteurs
export const IsAuth = (state) => state.auth.isConnected;
export const getToken = (state) => state.auth.token;
