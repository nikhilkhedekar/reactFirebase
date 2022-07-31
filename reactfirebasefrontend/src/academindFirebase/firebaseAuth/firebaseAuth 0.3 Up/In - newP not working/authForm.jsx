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
        <div>
            {signInState? (<h1>Sign In</h1>) : ( <h1>Sign Up</h1> )}
            <form onSubmit={submitHandler} >
            
            <label htmlFor='eamil' >
                Email: <input id='email' ref={emailRef} type='email' autoComplete='on' />
            </label>
            <label htmlFor='password' >
                <input id='password' ref={passwordRef} type='password' />
            </label>
            <div>
            {!loading && <button > {signInState? 'SignIn' : 'SignUp' } </button> }
            {loading && 'Loading...'}
            <button onClick={signInHandler} > {signInState? 'Create Account' : 'SignIn with existing account' } </button>
                </div>
            
        </form>
        </div>
        
    )
}

export default AuthForm
/**
 * <h1>{loggedIn ? 'LogIn' : 'SignUp'}</h1>

<form onSubmit={submitHandler} >
    <label htmlFor='email' >
        Email: <input id='email' ref={emailRef} required type='email' autoComplete='on' />
    </label>
    <label htmlFor='password' >
        <input id='password' ref={passwordRef} required type='password'  />
    </label>

    <div>{!loading && (<button> {loggedIn ? 'LogIn' : 'Create Account'} </button>)}
        {loading && <p>Sending Request...</p>}
        <button type='submit' onClick={logInHandler} >
            {loggedIn ? 'create account' : 'login with existing account'}
        </button>
    </div>

</form>
 */
