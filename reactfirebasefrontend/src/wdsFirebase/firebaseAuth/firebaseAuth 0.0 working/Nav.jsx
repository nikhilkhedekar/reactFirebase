import { useContext } from 'react'
import { NavLink, BrowserRouter, Switch, Route } from 'react-router-dom'

import HomePage from './homePage'
import SignInContext from './signInContext'
import SignInPage from "./signInPage"
import SignUpPage from "./signUpPage"
import UserProfilePage from "./userProfilePage"
import Store from './store'
import Cart from './cart'
import ForgotPassword from './forgotPassword'

const Nav = () => {
    const signInContext = useContext(SignInContext)

    return (
        <BrowserRouter>
            {!signInContext.isSignedIn ?
                <nav>
                    <NavLink exact to='/' > Home </NavLink>
                    <NavLink to='/signIn' >Sign In </NavLink>
                </nav>
                :
                <nav>
                    <NavLink to='/store' > Store </NavLink>
                    <NavLink to='/cart' > Cart </NavLink>
                    <NavLink to='/userProfile' > User Profile </NavLink>
                </nav>
            }



            <Switch>

                <Route exact path='/' >
                    <HomePage />
                </Route>
                <Route path='/signIn' >
                    <SignInPage />
                </Route>
                <Route path='/store' >
                    <Store />
                </Route>
                <Route path='/cart' >
                    <Cart />
                </Route>
                <Route path='/userProfile' >
                    <UserProfilePage />
                </Route>
                <Route path='/signUp' >
                    <SignUpPage />
                </Route>
                <Route path='/forgotPassword' >
                    <ForgotPassword />
                </Route>

            </Switch>
        </BrowserRouter>
    )
}

export default Nav