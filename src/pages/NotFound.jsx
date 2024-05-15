import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<main className="main bg-dark">
			<section className="error">
				<h1 className="error-title">404</h1>
				<p className="error-text">Oups! La page que vous demandez n'existe pas.</p>
				<Link className="error-link" to="/">
					Retourner sur la page d’accueil
				</Link>
			</section>
		</main>
	);
}

export default NotFound;
