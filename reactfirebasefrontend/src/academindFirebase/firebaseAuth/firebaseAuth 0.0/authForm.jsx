import React, { useContext, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from './authContextProvider';

const AuthForm = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const logInHandler = () => {
        setLoggedIn(prevState => !prevState);
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        setLoading(true);
        let url;
        if (loggedIn) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ';
        }else{
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ';
        }
        fetch(
            url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecuredToken: true,
            }),

        }
        ).then((response) => {
            console.log(response)
            setLoading(false);
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then((data) => {
                    let errorMessage;
                    if (data && data.message && data.message.error) {
                        console.log(data.message.error)
                        errorMessage = data.message.error
                        throw new Error(errorMessage)
                    }
                })
            }
        }).then((data) => {
            console.log(+data.expiresIn)
            console.log(data.idToken)
            const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
            authContext.logIn(data.idToken, expirationTime.toISOString());
            history.replace('/');

        }).catch((err) => {
            alert(err.message)
        })
    }

    return (
        <div>
            <h1>{loggedIn ? 'LogIn' : 'SignUp'}</h1>

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
        </div>
    )
}

export default AuthForm