import React from 'react'

import Header from './header'
import { SignInContextProvider } from './signInContextProvider'

const AuthApp = () => {
    return(
        <SignInContextProvider>
            <Header />
        </SignInContextProvider>
    )
}

export default AuthApp