import create from "zustand";
import { devtools } from "zustand/middleware";

export type Contact = {
	id?: number;
	name: string;
	accountNumber: string;
	sortCode: string;
};
export type Transaction = {
	vendorName: string;
	price: number ;
	category: string;
	type: string;
	date: string;
};
export type AccountType = {
	id: number;
	userId: number;
	accNumber: string;
	sortCode: string;
	accType: string;
	balance: number;
	transactions: Transaction[];
};

type User = {
	id: 1;
	firstName: string;
	lastName: string;
	customerNumber: string;
	password: string;
	lastLogin: string;
	contacts: Contact[];
	accounts?: AccountType[];
};

type SetBalanceFunction = (
	accounts: AccountType,
	prevBalance: number,
	amount: number,
	targetId: number
) => void;

type Store = {
	users: User[] | null;
	setUsers: (data: User[]) => void;
	activeCustomer: User | null;
	setActiveCustomer: (customer: User) => void;
	modal: string;
	setModal: (modal: string) => void;
	transactionSearchString: string;
	setTransactionSearchString: (newValue: string) => void;
	activeCustomerTransactions: Transaction[];
	setActiveCustomerTransactions: (transactions: Transaction[]) => void;
	accounts: AccountType[];
	setAccounts: (data: AccountType[]) => void;
	selectedAccount: string;
	setSelectedAccount: (account: string) => void;
	setOutgoingAccountBalance: SetBalanceFunction
	setIngoingAccountBalance: SetBalanceFunction
	currentAccount: AccountType | null;
	setCurrentAccount: (account: AccountType) => void;
};

const useStore = create<Store>((set, get) => ({
	// customerNumberInput: null,
	// handleChangeCN: (event) => {
	// 	set(({customerNumberInput: event.target.value}));
	// },
	// passwordInput: "",
	// handleChangePassword: (event) => {
	// 	set(({passwordInput: event.target.value}));
	// },
	users: [],
	setUsers: (data) => set({ users: data }),
	activeCustomer: null,
	setActiveCustomer: (customer) => set({ activeCustomer: customer }),
	modal: "",
	setModal: (modal) => set({ modal }),
	transactionSearchString: "",
	setTransactionSearchString: (newValue) =>
		set({ transactionSearchString: newValue }),
	activeCustomerTransactions: [],
	setActiveCustomerTransactions: (transactions) =>
		set({ activeCustomerTransactions: transactions }),
	accounts: [],
	setAccounts: (data) => set({ accounts: data }),
	selectedAccount: "",
	setSelectedAccount: (account) => set({ selectedAccount: account }),
	setOutgoingAccountBalance: (accounts, prevBalance, amount, targetId) =>
		set({
			accounts: accounts.map((account: AccountType) => {
				if (account.id === targetId) {
					return {
						...account,
						balance: (prevBalance - amount).toFixed(2),
					};
				}
				return account;
			}),
		}),
	setIngoingAccountBalance: (accounts, prevBalance, amount, targetId) =>
		set({
			accounts: accounts.map((account) => {
				if (account.id === targetId) {
					return {
						...account,
						balance: (prevBalance + amount).toFixed(2),
					};
				}
				return account;
			}),
		}),
	currentAccount: null,
	setCurrentAccount: (account) => set({ currentAccount: account }),
}));
export default useStore;
