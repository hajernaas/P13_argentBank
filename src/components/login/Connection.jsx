//Ce composant représente une page de connexion, qui gère l'état de la connexion à l'aide de Redux
//et redirige l'utilisateur vers la page de profil après une connexion réussie.
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
	getError,
} from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const Connection = () => {
	//Initialise deux états locaux (email et password) à l'aide du hook useState.
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// useDispatch est utilisé pour envoyer des actions Redux.
	const dispatch = useDispatch();
	//pour la navigation
	const navigate = useNavigate();

	//useSelector est utilisé pour extraire des données du store Redux.
	const authToken = useSelector(getToken);
	const rememberMe = useSelector(isRememberMe);
	const error = useSelector(getError);

	// useEffect est utilisé pour exécuter une action lorsque (authToken) change
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
	//la fonction handleToggleRememberMe permet d'interagir avec
	//le store Redux pour changer l'état RememberMe selon l'action utilisateur,
	const handleToggleRememberMe = () => {
		dispatch(toggleRememberMe());
	};

	// sont appelées à chaque fois que le contenu des champs de formulaire change
	const handleUsernameChange = (e) => {
		setEmail(e.target.value);
		if (e.target.value) {
			dispatch(clearErrors());
		}
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		if (e.target.value) {
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
