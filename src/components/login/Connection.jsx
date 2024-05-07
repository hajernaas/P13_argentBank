//Ce composant représente une page de connexion dans une application React, qui gère l'état
//de la connexion à l'aide de Redux et redirige l'utilisateur vers la page de profil après une connexion réussie.
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
	loginThunk,
	IsAuth,
	getToken,
	toggleRememberMe,
	isRememberMe,
	//getUserError,
	//getpasswordError,
	clearErrors,
	//getStatus,
	errorUser,
	//getSuccessMessage,
	//clearSuccessMessage,
} from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const Connection = () => {
	//Initialise deux états locaux (email et password) à l'aide du hook useState.
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//const [errorMessage, setErrorMessage] = useState("");
	//const [successMessage, setSuccessMessage] = useState("");
	// useDispatch est utilisé pour envoyer des actions Redux.
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//useSelector est utilisé pour extraire des données du store Redux.
	const isConnected = useSelector(IsAuth);
	const authToken = useSelector(getToken);
	const rememberMe = useSelector(isRememberMe);
	const error = useSelector(errorUser);
	//const status = useSelector(getStatus);
	//const successMessage = useSelector(getSuccessMessage);
	console.log("authToken", authToken);
	console.log("isAuthLogin", isConnected);

	console.log("errorlogin", error);

	//const passwordError = useSelector(getpasswordError);
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
			const response = dispatch(loginThunk({ email, password }));
			console.log("responseConnexion", response);

			//setSuccessMessage("User successfully logged in");
			//dispatch(clearErrors());
			//dispatch(setError(""));
			//navigate("/profile");
		} catch (error) {
			/*const message = error.response.data.message;
			console.log("message", message);
			dispatch(handleMessage(message));*/
			//console.log("Error submitting login form :", error);
			console.error("Login failed:", error);
			//setErrorMessage(error.message);
			//setError(error.message);
		}
	};

	const handleToggleRememberMe = () => {
		const c = dispatch(toggleRememberMe());
		console.log("ccc remb", c);
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
							//onChange={(e) => setEmail(e.target.value)}
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
							//onChange={(e) => setPassword(e.target.value)}
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
