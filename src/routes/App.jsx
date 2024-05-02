import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import NotFound from "../pages/NotFound.jsx";
import Layout from "./Layout.jsx";
import { useSelector } from "react-redux";
import { IsAuth, getToken } from "../slices/authSlice.js";

//Récupère l'état d'authentification du Redux store à l'aide du hook useSelector.

const App = () => {
	const isConnected = useSelector(IsAuth);
	console.log("isConnectedRoutes", isConnected);
	const token = useSelector(getToken);
	console.log("tokenRoutes", token);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/login" element={token ? <Navigate to={"/profile"} /> : <Login />} />
					{token && (
						<>
							<Route path="/profile" element={<Profile />} />
						</>
					)}
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
