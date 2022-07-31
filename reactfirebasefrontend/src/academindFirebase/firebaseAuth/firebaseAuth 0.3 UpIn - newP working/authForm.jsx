import React, { useState, useRef, useContext } from 'react'

import AuthContext from './authContext'

const AuthForm = () => {
    const [loading, setLoading] = useState(false)
    const [isSigningIn, setIsSigningIn] = useState(true)
    const emailRef = useRef()
    const passwordRef = useRef()
    const authCtx = useContext(AuthContext)
    const signInHandler = () => {
        setIsSigningIn(prevState => !prevState)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        setLoading(true)
        let url = '';
        if(isSigningIn){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ'
        }else{
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ'
        }
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                returnSecuredToken: true,
            }),
        })
        .then(res => {
            setLoading(false)
            console.log(res)
             return res.json()
        })
        .then(data => {
            console.log(data.idToken)
            authCtx.onSignIn(data.idToken);
        })
        .catch(err => alert(err))
    }
    return(
        <form onSubmit={submitHandler} >
            <label htmlFor='email' >
                <input id='email' type='email' ref={emailRef} />
            </label>
            <label htmlFor='password' >
                <input id='password' type='password' ref={passwordRef} />
            </label>
            <div>{!loading && (<button> {isSigningIn ? 'LogIn' : 'Create Account'} </button>)}
                    {loading && <p>Sending Request...</p>}
                    <button type='submit' onClick={signInHandler} >
                        {isSigningIn ? 'create account' : 'login with existing account'}
                    </button>
                </div>
        </form>
    )
}

export default AuthForm