import React, { useState } from 'react'

import AuthContext from './authContext'

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState('');
    const isSignedIn = !!token;
    const signInHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }
    const signOutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }
    const authContext = {
        token: token,
        isSignedIn: isSignedIn,
        onSignIn: signInHandler,
        onSignOut: signOutHandler
    }
    return(
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}