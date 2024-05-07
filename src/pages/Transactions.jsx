import React, { useEffect } from "react";
import data from "../data/accounts.json";
import TransactionDetails from "../components/user/TransactionDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk, getToken } from "../slices/authSlice";
import { useParams, Navigate } from "react-router-dom";

const Transactions = () => {
	const dispatch = useDispatch();
	const authToken = useSelector(getToken);

	const { id } = useParams();
	const accounts = data.find((item) => Number(item.id) === Number(id));

	console.log("accounts", accounts);
	useEffect(() => {
		if (authToken) {
			dispatch(fetchUserThunk(authToken));
			console.log("uuuuuuuuuuuu");
		}
	}, [authToken, dispatch]);

	if (accounts === undefined) {
		return <Navigate to="/error" />;
	}
	return (
		<main className="main bg-dark">
			<div className="transaction-page-header">
				<h2 className="transaction-title">Argent Bank {accounts.name}</h2>
				<h1 className="transaction-amount">{accounts.balance}</h1>
				<p className="transaction-type">{accounts.type} balance</p>
			</div>
			<h2 className="sr-only">Transactions</h2>
			<div className="transactions-box">
				<div className="legend">
					<p className="date">Date</p>
					<p className="description">Description</p>
					<p className="amount">Amount</p>
					<p className="balance">Balance</p>
				</div>
				{accounts.transactions.map((item) => (
					<TransactionDetails key={item.id} trans={item} />
				))}
			</div>
		</main>
	);
};

export default Transactions;
