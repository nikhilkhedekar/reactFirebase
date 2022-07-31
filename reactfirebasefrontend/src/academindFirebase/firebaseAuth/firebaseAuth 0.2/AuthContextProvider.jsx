import React, { useState } from 'react'

export const AuthContext = React.createContext({
    token: '',
    signnedIn: false,
    onSignIn: (token) => {},
    onSingOut: () => {},
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState()
    const isSignedIn = !!token;
    const signOutHandler = () => {
        setToken(null)
        localStorage.setItem(null)
    }
    const signInHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }
    const authCtx = {
        token: token,
        signnedIn: isSignedIn,
        onSignIn: signInHandler,
        onSingOut: signOutHandler,
    }
    return(
        <AuthContext.Provider value={authCtx} >
            {props.children}
        </AuthContext.Provider>
    )
}