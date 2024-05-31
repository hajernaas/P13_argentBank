import React from "react";

//Le composant Hero crée une section de contenu promotionnel avec plusieurs messages clés
//sur les avantages de la banque
const Hero = () => {
	return (
		<div className="hero">
			<section className="hero-content">
				<h2 className="sr-only">Promoted Content</h2>
				<p className="subtitle">No fees.</p>
				<p className="subtitle">No minimum deposit.</p>
				<p className="subtitle">High interest rates.</p>
				<p className="text">Open a savings account with Argent Bank today!</p>
			</section>
		</div>
	);
};

export default Hero;
