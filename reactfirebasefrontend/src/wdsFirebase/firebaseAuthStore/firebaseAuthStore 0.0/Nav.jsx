import { useContext } from 'react'
import { NavLink, BrowserRouter, Switch, Route } from 'react-router-dom'

import HomePage from './homePage'
import SignInContext from './signInContext'
import SignInPage from "./signInPage"
import SignUpPage from "./signUpPage"
import UserProfilePage from "./userProfilePage"
import ForgotPassword from './forgotPassword'
import DatabaseContext from './databaseContext'
import UserDashboard from './userDashboard'

const Nav = () => {
    // const signInContext = useContext(SignInContext)
    // const databaseCtx = useContext(DatabaseContext);
    // console.log('databaseCtx_files', databaseCtx.files);
    // console.log('databaseCtx_folders', databaseCtx.folders);

    return (
        <BrowserRouter>
            <NavLink exact to='/' > Home </NavLink>
            <NavLink to='/signIn' >Sign In </NavLink>


            <NavLink to='/userDashboard' > User Dashboard </NavLink>
            <NavLink to='/userProfile' > User Profile </NavLink>
            {/* {!signInContext.isSignedIn ?
                <nav>
                    
                </nav>
                :
                <nav>
                    
                </nav>
            } */}



            <Switch>
                <Route exact path='/' >
                    <HomePage />
                </Route>
                <Route path='/signIn' >
                    <SignInPage />
                </Route>
                <Route path='/userDashboard' >
                    <UserDashboard />
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