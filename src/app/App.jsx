import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import NotFound from "../pages/NotFound.jsx";
import Header from "../components/navigation/Header.jsx";
import Footer from "../components/navigation/Footer.jsx";
/*import { useSelector } from "react-redux";
import { IsAuth } from "./authSlice.js";*/

//Récupère l'état d'authentification du Redux store à l'aide du hook useSelector.
//const isConnected = useSelector(IsAuth);

const App = () => (
	<Router>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			{/* <Route path="/profile" element={isConnected ? <Profile /> : <Navigate replace to="/login" />} /> */}
			<Route path="/profile" element={<Profile />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
		<Footer />
	</Router>
);

export default App;
