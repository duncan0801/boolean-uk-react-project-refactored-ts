import { Button } from "@material-ui/core";
import { TextFieldsRounded } from "@material-ui/icons";
import useStore from "../../store";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import React from "react";

function QuickTransfer() {
	const accounts = useStore((state) => state.accounts);
	const activeCustomer = useStore((state) => state.activeCustomer);

	let userAccountsCount = 0;
	accounts.map((account) => {
		if (activeCustomer) {
			if (account.userId === activeCustomer.id) {
				userAccountsCount = ++userAccountsCount;
			}
		}

		return;
	});

	if (userAccountsCount <= 1) {
		return <section></section>;
	}

	return (
		<section className="quickTransfer">
			<h2>Quick Transfer</h2>
			<hr></hr>
			<form className="transferForm">
				<select name="from" id="from" placeholder="From...">
					<option value="">From...</option>
					{activeCustomer ? activeCustomer.accounts.map((account, index) => {
						return (
							<option key={index} value={`${account.accNumber}`}>
								{account.accNumber + " - " + account.accType}
							</option>
						);
					}) : null}
				</select>
				<select name="to" id="to" placeholder="To...">
					<option value="">To...</option>
					{activeCustomer.accounts.map((account, index) => {
						return (
							<option key={index} value={`${account.accNumber}`}>
								{account.accNumber + " - " + account.accType}
							</option>
						);
					})}
				</select>
				<CurrencyTextField
					name="amount"
					label="Amount"
					variant="filled"
					outputFormat="string"
					currencySymbol="£"
					className="input"
				/>
				<Button color="secondary" variant="contained" type="submit">
					Transfer
				</Button>
			</form>
		</section>
	);
}
export default QuickTransfer;
