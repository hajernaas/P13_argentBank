import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
//configureStore permet de créer le store redux pour gérer l'état global de l'application

export const store = configureStore({
	reducer: {
		auth: authSlice,
	},
});
