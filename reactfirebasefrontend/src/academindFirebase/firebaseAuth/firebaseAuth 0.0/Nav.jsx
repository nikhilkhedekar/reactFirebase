import React, { useContext } from 'react'
import { Link, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { AuthContext } from './authContextProvider'
import HomePage from './homePage'
import AuthForm from './authForm'
import ProfileForm from './profileForm'

const Nav = () => {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    const logoutHandler = authCtx.logOut()
    return (
        <header>
            <Router>
                <Link to='/' >
                    <div>React Firebase Auth</div>
                </Link>
                <nav>
                    {!isLoggedIn && (<Link to='/authForm'>LogIn</Link>)}
                    {isLoggedIn && (<Link to='/profileForm'>Profile</Link>)}
                    {isLoggedIn && (<button onClick={logoutHandler} >Logout</button>)}
                </nav>
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    {!authCtx.isLoggedIn && (<Route path='/authForm'>
                        <AuthForm />
                    </Route>)}
                    <Route path='/profileForm'>
                        {authCtx.isLoggedIn && <ProfileForm />}
                        {!authCtx.isLoggedIn && <Redirect to='/authForm' />}
                    </Route>
                    <Redirect to='/' >
                        <HomePage />
                    </Redirect>
                </Switch>
            </Router>
        </header>
    )
}

export default Nav