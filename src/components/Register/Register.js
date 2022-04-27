import React from "react";
import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""

    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onSubmitRegister = () => {
    // if(this.state.email.length === 0 || this.state.password.length === 0 ||this.state.name.length === 0){
    //   alert("Please fill in all the fields");
    // }else{
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange("home"); 
        }
      });
  };
  
  render() {
        
    return (
<div className="art ">       
<main className="main">
  <div className="register">
    <fieldset id="register_up" className="registerUp">
      <legend className="legend">Register</legend>
      <div className="mt">
        <label className="email" type="name">Name</label>
        <input required onChange={this.onNameChange}className="inputA" type="text" name="name"  id="name-input"/>
      </div>
      <div className="mt">
        <label className="email" type="email-address">Email</label>
        <input required onChange={this.onEmailChange} className="inputA" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv">
        <label className="password" type="password">Password</label>
        <input required onChange={this.onPasswordChange} className="inputA" type="password" name="password"  id="password"/>
      </div>
    
    <div className="">
      <input className="InputB grow" type="submit" value="Register" onClick={this.onSubmitRegister} />
    </div>
    </fieldset>
  </div>
</main>
</div>
    );
    }
  }
    export default Register;