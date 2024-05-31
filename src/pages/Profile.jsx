import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk, getToken } from "../slices/authSlice";
import UserInfo from "../components/user/UserInfo";

//ce composantcutilise Redux pour gérer l'état de l'authentification et les données de l'utilisateur.
const Profile = () => {
	const dispatch = useDispatch();
	const authToken = useSelector(getToken);

	//Utilisation de useEffect pour déclencher le fetchUserThunk
	//Lorsqu'un jeton d'authentification valide est présent, une action est dispatchée pour récupérer les données utilisateur
	useEffect(() => {
		if (authToken) {
			dispatch(fetchUserThunk(authToken));
		}
	}, [authToken, dispatch]);

	return (
		<>
			<UserInfo />
		</>
	);
};

export default Profile;
