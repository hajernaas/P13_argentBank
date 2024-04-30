//Ce composant représente une page de connexion dans une application React, qui gère l'état
//de la connexion à l'aide de Redux et redirige l'utilisateur vers la page de profil après une connexion réussie.
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, IsAuth, getToken } from "../../app/authSlice.js";
import { useNavigate } from "react-router-dom";

const Connection = () => {
	//Initialise deux états locaux (email et password) à l'aide du hook useState.
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// useDispatch est utilisé pour envoyer des actions Redux.
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//useSelector est utilisé pour extraire des données du store Redux.
	const isConnected = useSelector(IsAuth);
	const authToken = useSelector(getToken);
	console.log("authToken", authToken);
	console.log("isAuth", isConnected);

	// useEffect est utilisé pour exécuter une action lorsque l'état de connexion (isConnected) change
	useEffect(() => {
		if (isConnected) {
			navigate("/profile");
		}
	}, [isConnected, navigate]);

	// la fonction handleSubmit qui est exécutée lorsque le formulaire est soumis.
	//elle envoie une action Redux pour la connexion de l'utilisateur à l'aide de dispatch(loginThunk).
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			dispatch(loginThunk({ email, password }));
		} catch (error) {
			console.log("Error submitting login form :", error);
		}
	};
	//Rendu JSX du composant, contenant le formulaire de connexion.
	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<FontAwesomeIcon
					icon={faUserCircle}
					className="fa fa-user-circle sign-in-icon"></FontAwesomeIcon>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={email}
							// mettre à jour la variable email à l'aide de la fonction setEmail
							//chaque fois que le contenu de l'élément <input> change
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button type="submit" className="sign-in-button">
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
};

export default Connection;
