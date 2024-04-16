import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/navigation/header.js";
import Footer from "./components/common/navigation/footer.js";
import NotFound from "./components/common/error/notFound.js";
import Home from "./components/views/homeView.js";
import Login from "./components/views/loginView.js";
import Profile from "./components/views/profileView.js";
import { useSelector } from "react-redux";
import { IsAuth } from "./authSlice.js";

//Récupère l'état d'authentification du Redux store à l'aide du hook useSelector.
const isConnected = useSelector(IsAuth);

const App = () => (
	<Router>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/profile"
				element={isConnected ? <Profile /> : <Navigate replace to="/login" />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
		<Footer />
	</Router>
);

export default App;
