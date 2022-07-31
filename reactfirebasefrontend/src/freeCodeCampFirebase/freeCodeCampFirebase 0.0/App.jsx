import axios from "axios";
import { PureComponent } from "react";
import Home from "./pages/homee";
import LogIn from "./pages/loginn";
import SignUp from "./pages/signupp";

class App extends PureComponent {

    render() {
        return (
            <div>
                <Home />
                <SignUp />
                <LogIn />
            </div>
        )
    }
}

export default App