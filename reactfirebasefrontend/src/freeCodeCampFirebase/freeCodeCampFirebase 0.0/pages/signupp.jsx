import axios from "axios";
import { PureComponent } from "react";
import signup from "./signup";

class SignUp extends PureComponent {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            handle: ""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handle = this.handle.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    handleEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value,
        })
    }
    handle(e) {
        this.setState({
            handle: e.target.value,
        })
    }
    submitHandler(e) {
        e.preventDefault();
        const userSignUp = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        }
        const signUp = axios.post("http://localhost:5000/fir-cloudfunc-624b1/us-central1/api/signup", userSignUp);
        console.log("userSignedUp", signUp);
    }
    render() {
        return (
            <form onSubmit={this.submitHandler} >
                <input onChange={this.handleEmail} value={this.state.email} type="email" />
                <input onChange={this.handlePassword} value={this.state.password} type="password" />
                <input onChange={this.handleConfirmPassword} value={this.state.confirmPassword} type="password" />
                <input onChange={this.handle} value={this.state.handle} type="text" />
                <button type="submit" >Sign Up</button>
            </form>
        )
    }
}

export default SignUp