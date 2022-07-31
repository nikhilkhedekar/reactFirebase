import { useState, useEffect, useCallback } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, onAuthStateChanged,
    sendPasswordResetEmail,
    updatePassword,
    updateEmail
} from '@firebase/auth';

import { firebaseAuth } from './firebaseAuthentic'
import SignInContext from './signInContext';

export const SignInContextProvider = (props) => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState()

    const onSignUp = useCallback((email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }, [])

    const onSignIn = useCallback((email, password) => {
        setIsSignedIn(true)
        if (currentUser) {

            localStorage.setItem('token', currentUser.accessToken)
        }
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }, [])

    const onSignOut = useCallback(() => {

        setIsSignedIn(false)
        setCurrentUser(null)
        localStorage.removeItem('token')
        return signOut(firebaseAuth)
    }, [])

    const onResetPassword = (email) => {
        return sendPasswordResetEmail(firebaseAuth, email)
    }

    const onUpdateEmail = (email) => {
        return updateEmail(currentUser, email);
    }

    const onUpdatePassword = (password) => {
        console.log(updatePassword)
        return updatePassword(currentUser, password)
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(
            firebaseAuth, (user) => {
                setCurrentUser(user)
            }
        )
        console.log('current user', currentUser)

        return subscribe
    }, [])

    const signInContextProvider = {
        isSignedIn,
        onSignUp,
        onSignIn,
        onSignOut,
        onResetPassword,
        onUpdateEmail,
        onUpdatePassword,
        currentUser,
    }

    return (
        <SignInContext.Provider value={signInContextProvider} >
            {props.children}
        </SignInContext.Provider>
    )
}