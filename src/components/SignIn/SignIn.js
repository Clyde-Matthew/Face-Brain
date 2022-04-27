import React from "react";
import "./SignIn.css";

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signInEmail:'',
      signInPassword:''
    }
  }


  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = (event) => {
    event.preventDefault()
    fetch('https://facebrain-face-detection-app.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){  
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  };


  render(){
    const { onRouteChange } = this.props;
    return (
<div className="art ">       
<main className="main">
  <form className="singIn">
    <fieldset id="sign_up" className="signUp">
      <legend className="legend">Sign In</legend>
      <div className="mt">
        <label className="email" type="email-address">Email</label>
        <input onChange={this.onEmailChange} className="inputA" type="email" name="email-address"  id="email-address" required/>
      </div>
      <div className="mv">
        <label className="password" type="password">Password</label>
        <input onChange={this.onPasswordChange} className="inputA" type="password" name="password"  id="password" required/>
      </div>
    </fieldset>
    <div className="">
      <input className="InputB grow" type="submit" value="Sign in" onClick={this.onSubmitSignIn} />
    </div>
    <div className="logIn">
      <p onClick={()=>onRouteChange('register')} className="text link">Register</p>
    </div>
  </form>
</main>
</div>
    );
    }
}

    export default SignIn;