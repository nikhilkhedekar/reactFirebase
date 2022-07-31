import { useHistory, Link } from 'react-router-dom'
import { useContext, useState, useRef } from 'react'

import SignInContext from './signInContext'
import UserProfilePage from './userProfilePage'

const SignInPage = () => {
    const history = useHistory()
    const signInContext = useContext(SignInContext)
    const [validation, setValidation] = useState(false)
    const emailRef = useRef()
    const passwordref = useRef()

    const toSignUp = () => {
        history.push('/signUp')
    }

    const onSignIn = (e) => {
        e.preventDefault()
        if (emailRef.current.value.trim().length !== 0 && passwordref.current.value.trim().length !== 0) {
            setValidation(true)
        } else {
            setValidation(false)
            alert('wrong credentials')
        }
        const response = signInContext.onSignIn(emailRef.current.value, passwordref.current.value)
        console.log('sign in response', response)
        history.push('/store')
    }

    return (
        <div>
            <div>
                <h3>Sign In</h3>
            </div>
            <div>
            {validation ? <UserProfilePage />
                :
                <div>
                    <form onSubmit={onSignIn} >
                        <label htmlFor='email' >Email:
                            <input id='email' type='email' ref={emailRef} />
                        </label><br />
                        <label htmlFor='password' >Password:
                            <input id='password' type='password' ref={passwordref} />
                        </label><br />
                        <button>Sign In</button>
                    </form><br />
                    <Link to='/forgotPassword' > Forgot Password </Link>
                    <button onClick={toSignUp} > Create an Account </button>
                </div>
            }
            </div>
        </div>
    )
}

export default SignInPage