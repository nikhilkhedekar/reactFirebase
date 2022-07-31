import React from 'react'

import Header from './header'
import { SignInContextProvider } from './signInContextProvider'
import { DatabaseContextProvider } from './databaseContextProvider'

const AuthApp = () => {
    return (
        <SignInContextProvider>
            <DatabaseContextProvider>
                <Header />
            </DatabaseContextProvider>
        </SignInContextProvider>
    )
}

export default AuthApp