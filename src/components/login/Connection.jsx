//Ce composant représente une page de connexion dans une application React, qui gère l'état
//de la connexion à l'aide de Redux et redirige l'utilisateur vers la page de profil après une connexion réussie.
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
	loginThunk,
	getToken,
	toggleRememberMe,
	isRememberMe,
	clearErrors,
	errorUser,
} from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const Connection = () => {
	//Initialise deux états locaux (email et password) à l'aide du hook useState.
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// useDispatch est utilisé pour envoyer des actions Redux.
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//useSelector est utilisé pour extraire des données du store Redux.
	//	const isConnected = useSelector(IsAuth);
	const authToken = useSelector(getToken);
	const rememberMe = useSelector(isRememberMe);
	const error = useSelector(errorUser);

	// useEffect est utilisé pour exécuter une action lorsque l'état de connexion (isConnected) change
	useEffect(() => {
		if (authToken) {
			navigate("/profile");
		}
	}, [authToken, navigate]);

	// la fonction handleSubmit qui est exécutée lorsque le formulaire est soumis.
	//elle envoie une action Redux pour la connexion de l'utilisateur à l'aide de dispatch(loginThunk).
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			dispatch(loginThunk({ email, password }));
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const handleToggleRememberMe = () => {
		dispatch(toggleRememberMe());
	};

	const handleUsernameChange = (e) => {
		setEmail(e.target.value);
		if (error) {
			dispatch(clearErrors());
		}
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		if (error) {
			dispatch(clearErrors());
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
					{error && <div className="error-message">{error}</div>}

					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input
							type="email"
							id="username"
							value={email}
							// mettre à jour la variable email à l'aide de la fonction setEmail
							//chaque fois que le contenu de l'élément <input> change
							onChange={handleUsernameChange}
							required
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={handlePasswordChange}
							required
						/>
					</div>
					<div className="input-remember">
						<input
							type="checkbox"
							id="remember-me"
							checked={rememberMe}
							onChange={handleToggleRememberMe}
						/>

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
