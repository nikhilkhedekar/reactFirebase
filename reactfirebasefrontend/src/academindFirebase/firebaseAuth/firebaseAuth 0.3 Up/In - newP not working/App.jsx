import AuthForm from "./authForm"

import { AuthContextProvider } from "./AuthContextProvider"
import Nav from './Nav.jsx'

const App = () => {
    return (
        <div>
            <h1>React App</h1>
            <AuthContextProvider>
                <Nav />
            </AuthContextProvider>
        </div>
    )
}

export default App