import { useEffect } from "react";
import useStore from "../store";

function useFetchUserAccounts(targetId) {
	const userAccounts = useStore((state) => state.userAccounts);
	const setUserAccounts = useStore((state) => state.setUserAccounts);
	useEffect(() => {
		fetch(`http://localhost:4001/accounts/?userId=${targetId}`)
			.then((resp) => resp.json())
			.then((data) => setUserAccounts(data));
	}, []);
	return [userAccounts, setUserAccounts];
}
export default useFetchUserAccounts;
