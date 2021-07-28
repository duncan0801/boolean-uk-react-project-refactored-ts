import Account from "./Account";
import "../../styles/Transactions.css";
import BooleanLogo from "./BooleanLogo";
import useStore from "../../store";
import { useParams } from "react-router";
import Transaction from "./Transcation";
import { LocalConvenienceStoreOutlined, Search } from "@material-ui/icons";
import Select from "@material-ui/core/Select";
import SearchBar from "material-ui-search-bar";
import React from "react";

function Transactions() {
	const { accId } = useParams();

	const accounts = useStore((state) => state.accounts);
	let activeCustomer = useStore((state) => state.activeCustomer);

	let currentAccount = useStore((state) => state.currentAccount);
	let setCurrentAccount = useStore((state) => state.setCurrentAccount);

	const transactionSearchString = useStore(
		(state) => state.transactionSearchString
	);
	const setTransactionSearchString = useStore(
		(state) => state.setTransactionSearchString
	);

	const setActiveCustomerTransactions = useStore(
		(state) => state.setActiveCustomerTransactions
	);
	let activeCustomerTransactions = useStore(
		(state) => state.activeCustomerTransactions
	);

	const selectedAccount = useStore((state) => state.selectedAccount);
	const setSelectedAccount = useStore((state) => state.setSelectedAccount);

	setSelectedAccount(accId);

	function getTranscations() {
		const targetAccount = accounts.find((account) => {
			return account.id === Number(accId);
		});

		console.log("targetAccount.transactions:", targetAccount.transactions);
		setActiveCustomerTransactions(targetAccount.transactions);
	}
	getTranscations();

	// function filterTransactions() {
	//     const filtererdTransactions = activeCustomerTransactions.filter((transaction) => {
	//         return transaction.vendorName.toLowerCase().includes(transactionSearchString.toLowerCase())
	//         // TODO
	//     })
	//     setActiveCustomerTransactions(filtererdTransactions)
	// }

	function getCurrentAccount() {
		const target = accounts.find((account) => {
			console.log("account.id", account.id);
			console.log("Number(selectedAccount)", Number(selectedAccount));
			return account.id === Number(selectedAccount);
		});
		console.log(target);
		return target;
	}
	setCurrentAccount(getCurrentAccount());

	if (activeCustomerTransactions.length === 0 || !currentAccount) {
		return null;
	}

	return (
		<section>
			<h2>Transaction History</h2>
			<hr />
			<section className="transactionsWrapper">
				<h3>Account Name</h3>
				<div className="account">
					<div className="logoContainer">
						<BooleanLogo />
					</div>
					<div className="accountDetails">
						<h4>
							<span className="lightWeight">Account No:</span>
							{currentAccount.accNumber}
						</h4>
						<h4>
							<span className="lightWeight">Sort Code: </span>
							{currentAccount.sortCode}
						</h4>
					</div>
					<div className="balanceContainer">
						<h4>£{currentAccount.balance.toFixed(2)}</h4>
					</div>
				</div>
				<form className="searchForm">
					<SearchBar
						value={transactionSearchString}
						name="searchBar"
						onChange={(newValue) => {
							setTransactionSearchString(newValue);
							// filterTransactions()
						}}
					/>
					<Select />
				</form>
				<table class="transactionsTable">
					<thead>
						<tr>
							<th>Merchant</th>
							<th>Category</th>
							<th>Date</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{activeCustomerTransactions.map(
							(transaction, index) => {
								return (
									<Transaction
										key={index}
										vendorName={transaction.vendorName}
										category={transaction.category}
										date={transaction.date}
										price={transaction.price}
										type={transaction.type}
									/>
								);
							}
						)}
					</tbody>
				</table>
			</section>
		</section>
	);
}
export default Transactions;
