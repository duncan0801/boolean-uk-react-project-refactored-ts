import { useEffect } from "react";
import useStore from "../store";

function useFetchAccounts() {
	const setAccounts = useStore((state) => state.setAccounts);

	useEffect(() => {
		fetch(`http://localhost:4001/accounts`)
			.then((resp) => resp.json())
			.then((data) => setAccounts(data));
	}, []);


}
export default useFetchAccounts;
