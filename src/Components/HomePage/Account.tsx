import BooleanLogo from "./BooleanLogo";
import { Link } from "react-router-dom";
import { capitalise } from "../../Helpers.js";
import React from "react";

type AccountProps = {
	accId: number;
	accountName: string;
	accountNumber: string;
	sortCode: string;
	balance: number;
	userId: number;
};

function Account({
	accId,
	accountName,
	accountNumber,
	sortCode,
	balance,
	userId,
}: AccountProps) {
	return (
		<div className="accountContainer">
			<h3>{capitalise(accountName)}</h3>
			<div className="logoContainer">
				<BooleanLogo />
			</div>
			<div className="accountDetails">
				<h4>
					<span className="lightWeight">Account No:</span>
					{accountNumber}
				</h4>
				<h4>
					<span className="lightWeight">Sort Code: </span>
					{sortCode}
				</h4>
			</div>
			<div className="balanceContainer">
				<h4>£{balance.toFixed(2)}</h4>
			</div>
			<div className="actions">
				<Link to={`/home/account/${accId}`}>Make a Payment</Link>
				<Link to={`/home/account/${accId}/transactions`}>
					View Transcation History
				</Link>
			</div>
		</div>
	);
}
export default Account;
