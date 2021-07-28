import "./App.css";
import LoginPage from "./Pages/Login";
import { Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import AccountModal from "./Modals/Account";
import { useEffect } from "react";
import useStore from "./store";
import { useHistory } from "react-router";

function App() {
    const history = useHistory()
    const activeCustomer = useStore((state) => state.activeCustomer)
    useEffect(()=>{
        if(activeCustomer) {
            history.push("/home")
        }
        if (!activeCustomer){
            history.push("/login")
        }

    },[activeCustomer])
	return (
		<div className="App">
            <Header/>
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/home">
                    <HomePage/>
                </Route>
            </Switch>
            <AccountModal/>
		</div>
	);
}

export default App;
