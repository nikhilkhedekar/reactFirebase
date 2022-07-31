import React, {createContext} from 'react'

const AuthContext = createContext({
    token: '',
    isSignedIn: false,
    onSignIn: (token) => {},
    onSignOut: () => {},
})

export default AuthContext