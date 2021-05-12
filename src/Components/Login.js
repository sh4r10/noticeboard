import React, { Component } from "react";
import axios from "axios";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    onChangeEmail = e =>{
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword = e =>{
        this.setState({
            password: e.target.value
        });
    }
    
    onSubmit = e =>{
        e.preventDefault();
        const data = {
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post(this.props.host+"/login", data)
        .then((res) => {
                sessionStorage.setItem("token", res.data.accessToken)
                if(res.data.accessToken){
                    const setLoginState =  async () => await this.props.setLogin(true);
                    setLoginState();
                    window.location = "/";
                }
                else{
                    alert("Somethign went wrong, please try again");
                }
            })
            .catch((err) => {
                alert(err);
                window.location = "/login";
            });
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}> 
                    <label htmlFor="email">Email: </label>
                    <input type="text" max-length="40" placeholder="E-mail" id="email" value={this.state.email} onChange={this.onChangeEmail} required/>
                    <br/>
                    <label htlmFor="password">Password: </label>
                    <input type="password" max-length="30" placeholder="E-mail" id="email" value={this.state.password} onChange={this.onChangePassword} required/>
                    <br/>
                    <button type="submit">Log in!</button>
                </form>
            </div>
        )
    }
}

export default Login;