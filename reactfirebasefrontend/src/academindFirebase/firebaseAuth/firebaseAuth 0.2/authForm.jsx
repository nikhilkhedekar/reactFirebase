import React, { useRef, useState, useContext } from 'react'

import  { AuthContext } from './AuthContextProvider' 

const AuthForm = () => {
    const [loading, setLoading] = useState(false)
    const [signInState, setSignInState] = useState(true)
    const emailRef = useRef()
    const passwordRef = useRef()
    const authCtx = useContext(AuthContext)
    const signInHandler = () => {
        setSignInState(prevState => !prevState)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        
        const email = emailRef.current.value
        const password = passwordRef.current.value
        setLoading(true)
        let url;
        if(signInState){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ'
        }else{
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ'
        }
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                email,
                password,
                returnSecuredToken: true,
            })
        })
        .then(res => {
            setLoading(false)
            
                console.log(res)
            return res.json()
           
        })
        .then(data => {
            authCtx.onSignIn(data.idToken)
        })
        .catch(err => alert(err))
    }
    return (
        <form onSubmit={submitHandler} >
            {signInState? (<h1>Sign In</h1>) : ( <h1>Sign Up</h1> )}
            <label htmlFor='eamil' >
                Email: <input id='email' ref={emailRef} type='email' autoComplete='on' />
            </label>
            <label htmlFor='password' >
                <input id='password' ref={passwordRef} type='password' />
            </label>
            {!loading && <button > {signInState? 'SignIn' : 'SignUp' } </button> }
            {loading && <button onClick={signInHandler} > {signInState? 'Create Account' : 'SignIn with existing account' } </button> }
        </form>
    )
}

export default AuthForm