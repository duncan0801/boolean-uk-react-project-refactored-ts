import { Button } from "@material-ui/core";
import "../styles/AccountModal.css";
import useStore from "../store";
import { useHistory } from "react-router-dom";

function AccountModal() {
	const modal = useStore((state) => state.modal);
    const history= useHistory()
	const setActiveCustomer = useStore((state) => state.setActiveCustomer);
	const setModal = useStore((state) => state.setModal);
	const setTransactionSearchString = useStore((state) => state.setTransactionSearchString);
	const setActiveCustomerTransactions = useStore((state) => state.setActiveCustomerTransactions);
	const setAccounts = useStore((state) => state.setAccounts);
	const setSelectedAccount = useStore((state) => state.setSelectedAccount);
    const setCurrentAccount = useStore(state => state.setCurrentAccount)

	if (modal === "") {
		return null;
	}
	if (modal === "account") {
		return (
			<div className="accountModal">
				<div className="modal">
					<Button onClick={() => setModal("")} className="close">X</Button>
					<div>
						<Button
							onClick={() => {
                                history.push("/login")
								setActiveCustomer(null);
								setModal("")
                                setTransactionSearchString("")
                                setActiveCustomerTransactions([])
                                setAccounts([])
                                setSelectedAccount("")
                                setCurrentAccount(null)
                                ;
							}}
							variant="contained"
						>
							LogOut
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
export default AccountModal;
