import React from "react";
import { NavLink } from "react-router-dom";
import argentBankLogo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
/*import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, IsAuth, getUser } from "../../app/authSlice";*/
//import { IsAuth, getUser } from "../../app/authSlice";

const Header = () => {
	/*const dispatch = useDispatch();
	const navigate = useNavigate();

	const isAuthenticated = useSelector(IsAuth);
	const userFirstName = useSelector(getUser.firstName);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		navigate("/");
	};
*/
	return (
		<header>
			<nav className="main-nav">
				<NavLink className="main-nav-logo" to="/">
					<img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
					<h1 className="sr-only">Argent Bank</h1>
				</NavLink>
				<div className="login">
					{/* {isAuthenticated ? ( */}
					<>
						<NavLink className="main-nav-item user" to="/profile">
							<FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
							{"mohamed"}
						</NavLink>

						<NavLink className="main-nav-item" to="/login">
							<FontAwesomeIcon icon={faRightFromBracket} /> SignOut
						</NavLink>
					</>
					{/* ) : ( */}
					<NavLink className="main-nav-item" to="/login">
						<FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
						Sign In
					</NavLink>
					{/* )} */}
				</div>
			</nav>
		</header>
	);
};

export default Header;
