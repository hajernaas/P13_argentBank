import React from "react";
import { NavLink } from "react-router-dom";
import argentBankLogo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, IsAuth } from "../../app/authSlice";
//import React, { useState, useEffect } from "react";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useSelector(IsAuth);
	console.log("isAuthenticated", isAuthenticated);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		navigate("/");
	};

	const userFirstName = useSelector((state) => state.auth.firstName);
	console.log("userFirstName", userFirstName);

	return (
		<header>
			<nav className="main-nav">
				<NavLink className="main-nav-logo" to="/">
					<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
					<h1 className="sr-only">Argent Bank</h1>
				</NavLink>
				<div className="login">
					{isAuthenticated ? (
						<>
							<NavLink className="main-nav-item user" to="/profile">
								<FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
								{userFirstName}
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
