import React from "react";

const Account = () => {
	const accounts = [
		{
			id: 1,
			name: "checking (x8349)",
			balance: "$2,082.79",
			type: "available",
		},
		{
			id: 2,
			name: "savings (x6712)",
			balance: "$10,928.42 ",
			type: "available",
		},
		{
			id: 3,
			name: "credit card (x8349)",
			balance: "$184.30",
			type: "current",
		},
	];

	return (
		<>
			<h2 className="sr-only">Accounts</h2>
			{accounts.map((account) => (
				<section key={account.id} className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">argent bank {account.name}</h3>
						<p className="account-amount"> {account.balance}</p>
						<p className="account-amount-description">{account.type} balance</p>
					</div>

					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</section>
			))}
		</>
	);
};

export default Account;
