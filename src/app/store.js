import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
//configureStore permet de créer le store redux pour gérer l'état global de l'application

export const store = configureStore({
	reducer: {
		auth: authSlice,
	},
});
