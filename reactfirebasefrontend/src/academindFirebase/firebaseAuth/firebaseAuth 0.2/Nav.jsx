import { useContext } from 'react'
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom'

import { AuthContext } from './AuthContextProvider'
import AuthForm from "./authForm"
import ProfilePage from "./profilePage"

const Nav = () => {
    const authCtx = useContext(AuthContext)

    return (
        <Router>
            
                <NavLink exact to='/' >
                    Sign In / Sign Up
                </NavLink>
                
                <NavLink to='/profilePage' >
                    Profile Page
                </NavLink>


            <Switch>
                {!authCtx.signnedIn ?
                    (<Route exact path='/' >
                        <AuthForm />
                    </Route> )
                    :
                    (<Route path='/profilePage' >
                        <ProfilePage />
                    </Route>)}


            </Switch>
        </Router>
    )
}

export default Nav