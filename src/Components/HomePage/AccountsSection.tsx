import useFetchAccounts from "../../Hooks/useFetchAccounts";
import useStore from "../../store";
import Account from "./Account";
import useFetchUserAccounts from "../../Hooks/useFetchUserAccounts";
import { AccountType } from "../../store";

function Accounts() {
	const activeCustomer = useStore((state) => state.activeCustomer);
	const accounts = useStore((state) => state.accounts);
	const setAccounts = useStore((state) => state.setAccounts);

	useFetchAccounts();

	function filterAccounts() {
		if (activeCustomer) {
			let filteredAccounts: AccountType[] = accounts.filter(
				(account: AccountType) => account.id === activeCustomer.id
			);
			setAccounts(filteredAccounts);
			return filteredAccounts;
		}
	}

	if (accounts.length === 0) {
		return null;
	}
	if (accounts.length > 0) {
		return (
			<section className="accounts">
				<h2>Accounts</h2>
				<hr></hr>
				{accounts.map((account: AccountType, index: number) => {
					if (activeCustomer) {
						if (account.userId === activeCustomer.id) {
							return (
								<Account
									key={index}
									userId={account.userId}
									accId={account.id}
									accountName={account.accType}
									accountNumber={account.accNumber}
									sortCode={account.sortCode}
									balance={account.balance}
								/>
							);
						}
					}
				})}
			</section>
		);
	}
}
export default Accounts;
