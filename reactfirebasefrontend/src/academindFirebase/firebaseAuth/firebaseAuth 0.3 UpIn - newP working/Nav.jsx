import React, { useContext } from 'react'
import { Link, Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'

import AuthContext from './authContext'
import HomePage from './homePage';
import AuthForm from './authForm';
import ProfilePage from './profilePage';

const Nav = () => {
    const authCtx = useContext(AuthContext);
    const isSignedIn = authCtx.isSignedIn;
    const signOutHandler = authCtx.onSignOut;
    return(
        <header>
            <Router>
                <Link to='/' >
                    <div>React Firebase Auth</div>
                </Link>
                <nav>
                    {!isSignedIn && (<Link to='/authForm'>LogIn</Link>)}
                    {isSignedIn && (<Link to='/profilePage'>Profile</Link>)}
                    {isSignedIn && (<button onClick={signOutHandler} >Logout</button>)}
                </nav>
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    {!isSignedIn && (<Route path='/authForm'>
                        <AuthForm />
                    </Route>)}
                    <Route path='/profilePage'>
                        {isSignedIn && <ProfilePage />}
                        {!isSignedIn && <Redirect to='/authForm' />}
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