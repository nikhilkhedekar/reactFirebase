import { useContext } from 'react'
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'

import { AuthContext } from './AuthContextProvider'
import AuthForm from "./authForm"
import ProfilePage from "./profilePage"

const Nav = () => {
    const authCtx = useContext(AuthContext)

    return (

        <header>
            <Router>
                
                <nav>
                    {!authCtx.signnedIn && (<Link to='/'>LogIn</Link>)}
                    {authCtx.signnedIn && (<Link to='/profilePage'>Profile</Link>)}
                    {authCtx.signnedIn && (<button onClick={authCtx.onSignOut} >Logout</button>)}
                </nav>
                <Switch>
                    
                    {!authCtx.signnedIn && (<Route path='/'>
                        <AuthForm />
                    </Route>)}
                    <Route path='/profilePage'>
                        {authCtx.signnedIn && <ProfilePage />}
                        {!authCtx.signnedIn && <Redirect to='/' />}
                    </Route>
                    <Redirect to='/' >
                        <AuthForm />
                    </Redirect>
                </Switch>
            </Router>
        </header>
    )
}

export default Nav
