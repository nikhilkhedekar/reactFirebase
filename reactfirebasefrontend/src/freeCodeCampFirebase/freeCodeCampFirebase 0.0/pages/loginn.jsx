import { PureComponent } from "react";
import axios from "axios";

class LogIn extends PureComponent{
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
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
    submitHandler(e) {
        e.preventDefault();
        const userSignIn = {
            email: this.state.email,
            password: this.state.password,
        }
        const signIn = axios.post("http://localhost:5000/fir-cloudfunc-624b1/us-central1/api/login", userSignIn);
        console.log("userSignedUp", signIn);
    }
    render() {
        return(
            <form onSubmit={this.submitHandler} >
                <input onChange={this.handleEmail} value={this.state.email} type="email" />
                <input onChange={this.handlePassword} value={this.state.password} type="password" />           
                <button type="submit" >Sign In</button>
            </form>
        )
    }
}

export default LogIn