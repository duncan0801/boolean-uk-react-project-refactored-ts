import { Route } from "react-router";
import QuickTransfer from "../Components/HomePage/QuickTransfer";
import UserSummary from "../Components/HomePage/UserSummary";
import Accounts from "../Components/HomePage/AccountsSection";
import AccountButton from "../Components/HomePage/AccountButton";
import MakeAPayment from "../Components/HomePage/MakeAPayment";
import Transactions from "../Components/HomePage/Transactions";
import useStore from "../store";
import { capitalise } from "../Helpers";

function HomePage() {
	const activeCustomer = useStore((state) => state.activeCustomer);
	function getTime() {
		let current = new Date();
		let cDate =
			current.getDate().toString().padStart(2, "0") +
			"-" +
			(current.getMonth() + 1).toString().padStart(2, "0") +
			"-" +
			current.getFullYear();

		let cTime =
			current.getHours().toString().padStart(2, "0") +
			":" +
			current.getMinutes().toString().padStart(2, "0") +
			":" +
			current.getSeconds().toString().padStart(2, "0");
		let dateTime = cDate + ", " + cTime;

		return dateTime;
	}

	function postLoginTime() {
		if (activeCustomer) {
			fetch(`http://localhost:4000/users/${activeCustomer.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					lastLogin: getTime(),
				}),
			});
		}
	}
	postLoginTime();
	if (activeCustomer === null) {
		return null;
	}
	return (
		<div className="wrapper">
			<AccountButton />
			<UserSummary
				name={capitalise(
					`${
						activeCustomer.firstName + " " + activeCustomer.lastName
					}`
				)}
				customerNumber={activeCustomer.customerNumber}
				lastLogin={activeCustomer.lastLogin}
			/>
			<QuickTransfer />
			<Route exact path="/home">
				<Accounts/>
			</Route>
			<Route exact path="/home/account/:accountId">
				<MakeAPayment />
			</Route>
			<Route exact path="/home/account/:accId/transactions">
				<Transactions />
			</Route>
		</div>
	);
}
export default HomePage;
