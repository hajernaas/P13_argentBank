import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPen } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

//Ce composant permet d'afficher et de modifier les détails d'une transaction bancaire

const TransactionDetails = ({ trans }) => {
	//Indique si les détails de la transaction sont ouverts ou fermés.
	const [isOpen, setIsOpen] = useState(false);
	//Indique si la catégorie est en mode édition.
	const [isEditCategory, setIsEditCategory] = useState(false);
	//Stocke la catégorie de la transaction.
	const [category, setCategory] = useState(trans.category);
	//Indique si les notes sont en mode édition.
	const [isEditNotes, setIsEditNotes] = useState(false);
	//Stocke les notes de la transaction.
	const [notes, setNotes] = useState(trans.notes);

	//Permet de sortir du mode édition pour la catégorie.
	const handleBlurCategory = () => {
		setIsEditCategory(!isEditCategory);
	};

	//Permet de sortir du mode édition pour les notes.
	const handleBlurNotes = () => {
		setIsEditNotes(!isEditNotes);
	};

	//Structure JSX
	return (
		<section className={isOpen ? "transaction open" : "transaction"}>
			<div
				className="transaction-header "
				onClick={() => {
					setIsOpen(!isOpen);
				}}>
				<FontAwesomeIcon icon={faAngleDown} className="angledown-icon" />
				<p className="date">{trans.date}</p>
				<p className="description">{trans.description}</p>
				<p className="amount">${trans.amount}</p>
				<p className="balance">${trans.balance}</p>
			</div>
			{isOpen ? (
				<div className="transaction-infos">
					<p>Transaction Type: {trans.type}</p>

					{!isEditCategory ? (
						<p>
							Category: {category}
							<FontAwesomeIcon
								icon={faPen}
								className="pen-icon"
								onClick={() => setIsEditCategory(!isEditCategory)}
							/>
						</p>
					) : (
						<p>
							Category:
							<input
								type="text"
								value={category}
								id="category"
								onChange={(e) => setCategory(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										setIsEditCategory(!isEditCategory);
									}
								}}
								onBlur={handleBlurCategory}
							/>
						</p>
					)}

					{!isEditNotes ? (
						<p>
							Notes: {notes}
							<FontAwesomeIcon
								icon={faPen}
								className="pen-icon"
								onClick={() => setIsEditNotes(!isEditNotes)}
							/>
						</p>
					) : (
						<p>
							Notes:
							<input
								type="text"
								value={notes}
								id="notes"
								onChange={(e) => setNotes(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										setIsEditNotes(!isEditNotes);
									}
								}}
								onBlur={handleBlurNotes}
							/>
						</p>
					)}
				</div>
			) : null}
		</section>
	);
};

TransactionDetails.propTypes = {
	trans: PropTypes.shape({
		date: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		amount: PropTypes.number.isRequired,
		balance: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
		category: PropTypes.string,
		notes: PropTypes.string,
	}).isRequired,
};

export default TransactionDetails;
