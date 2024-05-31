import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import argentBankLogo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, getToken, getFirstName } from "../../slices/authSlice.js";

//Le composant Header gère l'affichage de la barre de navigation de l'application,
//y compris les liens de connexion et de déconnexion en fonction de l'état de connexion de l'utilisateur.
const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//useSelector pour accéder à l'état global (token et userFirstName).
	const token = useSelector(getToken);
	const userFirstName = useSelector(getFirstName);
	const firsttname = localStorage.getItem("firstname");
	//useState pour gérer l'état local isLogged indiquant si l'utilisateur est connecté.
	const [isLogged, setIsLogged] = useState(false);

	//pour mettre à jour isLogged lorsque le token change.
	useEffect(() => {
		if (token !== null) {
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
	}, [navigate, token]);

	//Déconnecte l'utilisateur en dispatchant l'action logout et redirige vers la page d'accuei
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		setIsLogged(false);
		navigate("/");
	};

	//Structure JSX
	return (
		<header>
			<nav className="main-nav">
				<NavLink className="main-nav-logo" to="/">
					<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
					<h1 className="sr-only">Argent Bank</h1>
				</NavLink>
				<div className="login">
					{isLogged === true ? (
						<>
							<NavLink className="main-nav-item user" to="/profile">
								<FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
								{userFirstName ? userFirstName : firsttname}
							</NavLink>

							<NavLink className="main-nav-item" to="/" onClick={handleLogout}>
								<FontAwesomeIcon icon={faRightFromBracket} /> SignOut
							</NavLink>
						</>
					) : (
						<NavLink className="main-nav-item" to="/login">
							<FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
							Sign In
						</NavLink>
					)}
				</div>
			</nav>
		</header>
	);
};
export default Header;
