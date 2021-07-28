type UserSummaryProps = {
    name: string
    customerNumber: string
    lastLogin: string
}

function UserSummary({name, customerNumber, lastLogin}: UserSummaryProps) {
	return (
		<section className="customerSummary">
			<h2>Customer Summary</h2>
			<hr></hr>
			<div className="sectionWrapper">
				<h3 className="name">{name}</h3>
				<h3><span className="lightWeight">Customer Number:</span> {customerNumber}</h3>
				<h3><span className="lightWeight">Last Login:</span> {lastLogin}</h3>
			</div>
		</section>
	);
}
export default UserSummary
