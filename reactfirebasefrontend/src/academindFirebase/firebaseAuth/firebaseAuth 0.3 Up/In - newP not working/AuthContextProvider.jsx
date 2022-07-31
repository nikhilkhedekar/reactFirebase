import React, { useState } from 'react'

export const AuthContext = React.createContext({
    token: '',
    signnedIn: false,
    onSignIn: (token) => {},
    onSignOut: () => {},
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState()
    const isSignedIn = !!token;
    const signOutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }
    const signInHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }
    const authCtx = {
        token: token,
        signnedIn: isSignedIn,
        onSignIn: signInHandler,
        onSignOut: signOutHandler,
    }
    return(
        <AuthContext.Provider value={authCtx} >
            {props.children}
        </AuthContext.Provider>
    )
}