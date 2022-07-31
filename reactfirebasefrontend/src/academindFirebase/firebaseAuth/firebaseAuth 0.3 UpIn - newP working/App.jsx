import Nav from './Nav'
import { AuthContextProvider } from './authContextProvider'

const App = () => {
    return(
        <AuthContextProvider>
            <Nav />
        </AuthContextProvider>
    )
}

export default App