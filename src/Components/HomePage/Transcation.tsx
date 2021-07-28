import { capitalise } from "../../Helpers";
import React from "react";

function Transaction({vendorName, category, date, price, type}) {
	return (
		<tr>
			<td>{capitalise(vendorName)}</td>
			<td>{capitalise(category)}</td>
			<td>{date}</td>
			<td>{type === "outgoing" ? `-£${price.toFixed(2)}`: `£${price.toFixed(2)}`}</td>
		</tr>
	);
}
export default Transaction
