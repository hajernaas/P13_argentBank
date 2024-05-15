import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPen } from "@fortawesome/free-solid-svg-icons";

const TransactionDetails = ({ trans }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditCategory, setIsEditCategory] = useState(false);
	const [category, setCategory] = useState(trans.category);
	const [isEditNotes, setIsEditNotes] = useState(false);
	const [notes, setNotes] = useState(trans.notes);

	const handleBlurCategory = () => {
		setIsEditCategory(!isEditCategory);
	};

	const handleBlurNotes = () => {
		setIsEditNotes(!isEditNotes);
	};

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

export default TransactionDetails;
