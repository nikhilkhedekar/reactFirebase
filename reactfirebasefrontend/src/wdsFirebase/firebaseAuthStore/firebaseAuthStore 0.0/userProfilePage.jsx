import { useContext, useRef, useState } from "react"
import { useHistory } from 'react-router-dom'
import { updatePassword } from "@firebase/auth"

import SignInContext from "./signInContext"

const UserProfilePage = () => {
    const history = useHistory()
    const signInContext = useContext(SignInContext)
    const emailRef = useRef()
    const passwordRef = useRef()

    const onSignOut = () => {
        const response = signInContext.onSignOut();
        console.log('sign out response', response);
        history.push('/')
    }

    const onUpdateEmail = (e) => {
        e.preventDefault()
        const response = signInContext.onUpdateEmail(emailRef.current.value)
        console.log('update email response', response)
    }

    const onUpdatePassword = (e) => {
        e.preventDefault()
        const response = signInContext.onUpdatePassword(passwordRef.current.value)
        console.log('update password response', response)
    }

    return (
        <div>
            <form onSubmit={onUpdateEmail} >
                <label htmlFor='email' >Enter New Email:
                    <input id='email' type='email' ref={emailRef} />
                </label><br />
                <button  > Update Email </button>
            </form><br />

            <form onSubmit={onUpdatePassword} >
                <label htmlFor='password' >Enter New Password:
                    <input id='password' type='password' ref={passwordRef} />
                </label><br />
                <button  > Update Password </button>
            </form><br />
            <button onClick={onSignOut} > LogOut </button>
        </div>
    )
}

export default UserProfilePage