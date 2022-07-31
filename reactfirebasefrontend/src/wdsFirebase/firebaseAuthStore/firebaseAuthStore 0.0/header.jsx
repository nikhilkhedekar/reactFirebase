import { useContext } from "react"

import SignInContext from "./signInContext"
import Nav from "./Nav"

const Header = () => {
    const signInContext = useContext(SignInContext)
    return (
        <div>
            <div><h1>WDSReactApp</h1></div>
            
            <Nav />
        </div>
    )
}

export default Header