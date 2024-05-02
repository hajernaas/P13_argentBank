import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk, getToken } from "../slices/authSlice";
import UserInfo from "../components/user/UserInfo";

const Profile = () => {
	const dispatch = useDispatch();
	const authToken = useSelector(getToken);

	//Utilisation de useEffect pour déclencher le fetchUserThunk dès que User est connecté aprés avoir vérifier que authToken existe.
	//Lorsqu'un jeton d'authentification valide est présent, une action est dispatchée pour récupérer les données utilisateur
	//en appelant fetchUserThunk.Cela déclenchera une requête vers votre API pour récupérer les données de l'utilisateur associé à ce jeton d'authentification.
	useEffect(() => {
		if (authToken) {
			dispatch(fetchUserThunk(authToken));
			console.log("uuuuuuuuuuuu");
		}
	}, [authToken, dispatch]);

	return (
		<>
			<UserInfo />
		</>
	);
};

export default Profile;
