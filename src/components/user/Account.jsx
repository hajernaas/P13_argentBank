import React from "react";
import { Link } from "react-router-dom";
import data from "../../data/accounts.json";

//Ce composant affiche une liste de comptes bancaires en utilisant des données provenant d'un fichier JSON
const Account = () => {
	return (
		<>
			<h2 className="sr-only">Accounts</h2>
			{data.map((account) => (
				<section key={account.id} className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">argent bank {account.name}</h3>
						<p className="account-amount"> {account.balance}</p>
						<p className="account-amount-description">{account.type} balance</p>
					</div>

					<div className="account-content-wrapper cta">
						<Link to={`/account/${account.id}`}>
							<button className="transaction-button">View transactions</button>
						</Link>
					</div>
				</section>
			))}
		</>
	);
};

export default Account;
