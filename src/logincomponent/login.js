import React from "react";
import axios from 'axios';
import Lists from "../viewlists/lists";
import Sample1 from "../index"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Login extends React.Component{
  constructor(){
    super();
    this.state={ 
      loginemail:"",
      loginpassword:"",
      firstName:"",
      lastName:"",
      email:"",
      mobilenumber:"",
      password:"",
      success:false,
      data:{}
    }
    
    this.handleChange=this.handleChange.bind(this)   
    this.handleformsubmit=this.handleformsubmit.bind(this)
    this.handlelogin=this.handlelogin.bind(this)
  }
  handleChange(event){
    this.setState({
     [event.target.name]:event.target.value
    })
  }
  handleformsubmit(e){
   
    e.preventDefault()
    axios
    .post('http://ec2-18-218-72-224.us-east-2.compute.amazonaws.com:3000/api/v1/users/signup',this.state)
    .then(response =>{
      alert("success")
    })
    .catch(error => {
      alert("Error")
      console.log(error)
    })
    }

    handlelogin(e){
      let logindata={
        email:this.state.loginemail,
        password:this.state.loginpassword
      }
      e.preventDefault()
      axios
      .post('http://ec2-18-218-72-224.us-east-2.compute.amazonaws.com:3000/api/v1/users/login',logindata)
      .then(response =>{
        this.state.data=response.data;
        console.log("from props"+this.state.data.message)  
        alert("success")
        this.setState({success:true})
        console.log(response)
      })
      .catch(error => {
        alert("Error")
        console.log(error)
      })   
    }
  render(){
   
return(
<Router>
  <html>
<head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
  <link rel="stylesheet" href="/css/app.component.css" type="text/css" />
<script type="text/js" src="node_modules/react/dist/react.min.js"></script>
<script type="text/js" src="node_modules/react-dom/dist/react-dom.min.js"></script>
</head>
<body>
<div style={{backgroundColor:"#06fa" , marginBottom: "1%"}}>
    <form className="forloginform" style={{paddingBottom: "1%"}} onSubmit={this.handlelogin}>
      <h3 style={{marginLeft:"15%",color:"white"}}>Todo-List</h3>
      <label style={{color:"white" ,marginRight:"20%",marginLeft: "5%"}}>Email</label>
      <label >Password</label>
      <br />
      
      <div style={{marginRight: "7%"}}>
        <input type="text" 
        name="loginemail" 
        value={this.state.loginemail} 
        onChange={this.handleChange}
        placeholder="Enter your mail" />
        <input type="password" 
        name="loginpassword" 
        onChange={this.handleChange}
        value={this.state.loginpassword} 
        style={{marginLeft:"5%"}} placeholder="password" />
        {this.state.success ? <Link to="/view" ><button type="submit" className="btn btn-primary" onClick={this.navigatelists} style={{marginLeft:"5%"}}>LogIn1</button></Link>:<button type="submit" className="btn btn-primary" style={{marginLeft:"5%"}}>LogIn</button> }
        <br />
        <a href="gogle.com" style={{color:"white",marginLeft:"24%"}}> Forgotten Password ? </a>
      </div>
    </form>

  </div>
  <div style={{marginLeft:"35%",marginRight: "35%"}}>
    <div align="center">
      <h2>Welcome!</h2>
      <h4>Create a New Account</h4>
    </div>
  <form onSubmit={this.handleformsubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input type="text" 
        className="form-control" 
        name="firstName" 
        value={this.state.firstName} 
        aria-describedby="emailHelp"
        onChange={this.handleChange}
          placeholder="Enter First Name" required />
        <label>Last Name</label>
        <input type="text"
         className="form-control" 
         name="lastName" 
         value={this.state.lastName} 
         onChange={this.handleChange}
         aria-describedby="emailHelp"
          placeholder="Enter Last Name" required />
        <label>Email</label>
        <input type="email" 
        className="form-control" 
        name="email" 
        value={this.state.email} 
        onChange={this.handleChange}
        aria-describedby="emailHelp" 
        placeholder="Enter EmailId"
          required />
        <label>Password</label>
        <input type="password" 
        className="form-control" 
        name="password" 
        onChange={this.handleChange}
        value={this.state.password} 
        aria-describedby="emailHelp"
        placeholder="Enter Password" required />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        <label>Mobile Number</label>
        <input type="text" 
        className="form-control" 
        name="mobilenumber" 
        value={this.state.mobilenumber} 
        onChange={this.handleChange}
        aria-describedby="emailHelp"
        placeholder="Enter First Name" required />
      </div>
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
    </div>
</body>
</html>
<Sample1 check={this.state.data}/>
</Router>
      )
  }

}
export  default Login 