import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import SignInContext from "./signInContext";

const SignUpPage = () => {
    const signInContext = useContext(SignInContext)
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [validation, setValidation] = useState(false)
    const onSignUp = (e) => {
        e.preventDefault();
        if(passwordRef.current.value === confirmPasswordRef.current.value){
            setValidation(true);
            console.log('password validation', validation)
        }else{
            setValidation(false);
            alert('Entered Password is not matching');
        }
        const response = signInContext.onSignUp(emailRef.current.value, confirmPasswordRef.current.value);
        console.log('Sign Up Response', response)
        history.push('/signIn')
    }
    return (
        <div>
            <h3>Sign UP</h3>
            <form onSubmit={onSignUp} >
                <label htmlFor='email' >Email:
                    <input id='email' type='email' ref={emailRef} />
                </label><br />
                <label htmlFor='password' >Password:
                    <input id='password' type='password' ref={passwordRef} />
                </label><br />
                <label htmlFor='confirmPassword' >Confirm Password:
                    <input id='confirmPassword' type='password' ref={confirmPasswordRef} />
                </label><br />
                <button >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpPage