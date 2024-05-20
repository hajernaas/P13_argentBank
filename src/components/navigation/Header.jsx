import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import argentBankLogo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, getToken, getFirstName } from "../../slices/authSlice.js";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = useSelector(getToken);
	const userFirstName = useSelector(getFirstName);
	const firsttname = localStorage.getItem("firstname");
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		if (token !== null) {
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
	}, [navigate, token]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		setIsLogged(false);
		navigate("/");
	};

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
