import React from "react";
import PropTypes from "prop-types";

//Ce code définit un composant fonctionnel FeatureItem qui affiche une fonctionnalité particulière avec une icône,
//un titre et une description.
const FeatureItem = ({ icon, title, text }) => {
	return (
		<div className="feature-item">
			<img src={icon} alt="Chat Icon" className="feature-icon" />
			<h3 className="feature-item-title">{title}</h3>
			<p>{text}</p>
		</div>
	);
};

FeatureItem.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};

export default FeatureItem;
