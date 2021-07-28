import SignIn from "../Components/SignIn";
import useFetchUsers from "../Hooks/useFetchUsers";
import React from "react";


function LoginPage() {
    const users = useFetchUsers()

	return (
		<>
            <SignIn />
		</>
	);
}
export default LoginPage;
