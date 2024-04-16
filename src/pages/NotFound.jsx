import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div>
			<section className="error">
				<h1 className="error__title">404</h1>
				<p className="error__text">Oups! La page que vous demandez n'existe pas.</p>
				<Link className="error__link" to="/">
					Retourner sur la page d’accueil
				</Link>
			</section>
		</div>
	);
};

export default NotFound;
