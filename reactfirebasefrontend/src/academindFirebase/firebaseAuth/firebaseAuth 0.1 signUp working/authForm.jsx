import React, { useRef } from 'react'

const AuthForm = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const submitHandler = (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                email,
                password,
                returnSecuredToken: true,
            })
        })
        .then(res => {
            console.log(res)
        }).catch(err => alert(err))
    }
    return (
        <form onSubmit={submitHandler} >
            <label htmlFor='eamil' >
                Email: <input id='email' ref={emailRef} type='email' autoComplete='on' />
            </label>
            <label htmlFor='password' >
                <input id='password' ref={passwordRef} type='password' />
            </label>
            <input type='submit' value='submit' />
        </form>
    )
}

export default AuthForm