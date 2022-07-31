import { createContext } from "react"

const SignInContext = createContext({
    isSignedIn: false,
    onSignUp: (email, password) => {},
    onSignIn: (email, password) => {},
    onSignOut: () => {},
    onResetPassword: (eamil) => {},
    onUpdateEmail: (email) => {},
    onUpdatePassword: (password) => {},
    currentUser: null,
})

export default SignInContext;