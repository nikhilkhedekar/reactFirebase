import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import SignInContext from "./signInContext";

const ForgotPassword = () => {
    const signInContext = useContext(SignInContext)
    const history = useHistory()
    const emailRef = useRef();
    const onResetPassword = (e) => {
        e.preventDefault()
        const response = signInContext.onResetPassword(emailRef.current.value)
        console.log('password reset response', response)
        alert('check email box')
        history.push('/signIn')
    }
    return (
        <div>
            <h3>Forgot Password</h3>
            <form onSubmit={onResetPassword} >
                <label htmlFor='email' >Enter Registered Email Address:
                    <input id='email' type='email' ref={emailRef} />
                </label><br />
                
                <button>Change Password</button>
            </form>
        </div>
    )
}

export default ForgotPassword