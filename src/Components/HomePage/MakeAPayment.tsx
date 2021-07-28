import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import useStore from "../../store";
import "../../styles/MakeAPayment.css";
//@ts-ignore
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Select from "@material-ui/core/Select";
import { useParams } from "react-router-dom";
import { Transaction } from "../../store";
import { AccountType } from "../../store";

function MakeAPayment() {
	const history = useHistory();
	const { accountId } = useParams();
	const users = useStore((state) => state.users);
	const activeCustomer = useStore((state) => state.activeCustomer);
	const setOutgoingAccountBalance = useStore(
		(state) => state.setOutgoingAccountBalance
	);
	const setIngoingAccountBalance = useStore(
		(state) => state.setIngoingAccountBalance
	);
	const accounts = useStore((state) => state.accounts);
	const setSelectedAccount = useStore((state) => state.setSelectedAccount);
	const selectedAccount = useStore((state) => state.selectedAccount);
	const activeCustomerTransactions = useStore(
		(state) => state.activeCustomerTransactions
	);
	const setActiveCustomerTransactions = useStore(
		(state) => state.setActiveCustomerTransactions
	);

	function getTranscations() {
		const targetAccount = accounts.find((account) => {
			return account.id === Number(accountId);
		});

		if (targetAccount)
			setActiveCustomerTransactions(targetAccount.transactions);
	}
	getTranscations();

	setSelectedAccount(accountId);
	function getDate() {
		let current = new Date();
		let cDate =
			current.getDate().toString().padStart(2, "0") +
			"-" +
			(current.getMonth() + 1).toString().padStart(2, "0") +
			"-" +
			current.getFullYear();

		return cDate;
	}

	function postTransaction(
		firstName: string,
		lastName: string,
		amount: number,
		type: string,
		accId: number
	) {
		const newTransaction: Transaction = {
			vendorName: firstName + " " + lastName,
			price: amount,
			category: "payment",
			type: type,
			date: getDate(),
		};
		fetch(`http://localhost:4000/accounts/${accId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				transactions: [...activeCustomerTransactions, newTransaction],
			}),
		});
		setActiveCustomerTransactions([
			...activeCustomerTransactions,
			newTransaction,
		]);
	}

	function handlePaymentSubmit(amount: number, targetAccNumber: string) {
		let numberAmount = Number(amount);

		let ingoingAccount = accounts.find((account) => {
			return account.accNumber === targetAccNumber;
		});
		let outgoingAccount = accounts.find((account) => {
			return account.id === Number(selectedAccount);
		});
		if (users) {
			let ingoingCustomer = users.find((user) => {
				if (ingoingAccount) {
					return user.id === ingoingAccount.userId;
				}
			});
		}
		if (ingoingAccount && activeCustomer) {
			fetch(`http://localhost:4000/accounts/${ingoingAccount.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					balance: ingoingAccount.balance + numberAmount,
				}),
			})
				.then(() =>
					postTransaction(
						activeCustomer.firstName,
						activeCustomer.lastName,
						numberAmount,
						"ingoing",
						ingoingAccount ? ingoingAccount.id : NaN
					)
				)
				.then(function () {
					if (outgoingAccount) {
						return fetch(
							`http://localhost:4000/accounts/${accountId}`,
							{
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									balance:
										outgoingAccount.balance - numberAmount,
								}),
							}
						);
					}
				})
				.then((resp) => {
					if (resp) {
						if (resp.ok) {
							alert("success");
						}
						if (!resp.ok) {
							alert("Fail");
						}
					}
				})
				.then(() => {
					setOutgoingAccountBalance(
						accounts,
						outgoingAccount.balance,
						numberAmount,
						outgoingAccount.id
					);
					postTransaction(
						ingoingCustomer.firstName,
						ingoingCustomer.lastName,
						numberAmount,
						"outgoing",
						accountId
					);
					history.push("/home");
				});
		}
	}
	return (
		<section>
			<h2>Make A Payment</h2>
			<hr />
			<div>
				<form
					className="paymentForm"
					onSubmit={(event) => {
						event.preventDefault();
						console.log(event.target.amount.value);
						handlePaymentSubmit(
							event.target.amount.value,
							event.target.contacts.value
						);
					}}
				>
					<div className="contacts">
						<label className="label">
							Pay A Contact:
							<Select
								onChange={(event) =>
									console.log(
										"Sending to account No.  ",
										event.target.value
									)
								}
								className="input"
								name="contacts"
								id=""
							>
								<option value="">Choose a contact...</option>
								{activeCustomer.contacts.map(
									(contact, index) => {
										return (
											<option
												key={index}
												value={contact.accountNumber}
											>
												{contact.name}
											</option>
										);
									}
								)}
							</Select>
						</label>
					</div>
					{/* <div className="newContact">
						<TextField
                        className="input"
							label="First Name "
							color="secondary"
							variant="filled"
						/>
						<TextField
                        className="input"
							color="secondary"
							label="Last Name "
							variant="filled"
						/>
						<TextField
                        className="input"
							color="secondary"
							label="Account No."
							variant="filled"
						/>
						<TextField
                        className="input"
							color="secondary"
							label="Sort Code"
							variant="filled"
						/>
					</div> */}
					<div className="amount">
						<CurrencyTextField
							name="amount"
							label="Amount"
							variant="filled"
							outputFormat="string"
							currencySymbol="£"
							className="input"
						/>
						<Button
							color="secondary"
							variant="contained"
							type="submit"
						>
							{"Send >"}
						</Button>
					</div>
				</form>
			</div>
		</section>
	);
}
export default MakeAPayment;
