import React,{lazy} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import Lists from './viewlists/lists';
import axios from 'axios';
import Form_of_list  from './createlist/listform';
import View_tasks from "./tasks/viewtasks";

function Updatestate(val){
        this.setState(val,()=>{

          console.log("this is state :"+this.state.listsedit+':'+this.state.listId)
 
        })
          }  
class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            login:true,
            lists:false,
            tasks:false,
            createlist:false,
            listsedit:false,
            logindata:{},
            taskdata:{},
            listsdata:{},
            listId:undefined
        }
        Updatestate=Updatestate.bind(this)
    }
    render(){

        return(
            <div>
              {this.state.login &&  <Login />}
            {((this.state.createlist == false && this.state.listsedit == false) && (this.state.login == false && this.state.tasks==false) ) && <Lists logineddata={this.state.logindata} /> }
              {this.state.tasks && <View_tasks data={this.state.taskdata} userdata={this.state.logindata}/>}
              {this.state.createlist && <Form_of_list logineddata={this.state.logindata} edit={this.state.listsedit} />}
              {this.state.listsedit && <Form_of_list logineddata={this.state.logindata} edit={this.state.listsedit} listId={this.state.listId} />}
            </div>


        )
    }

}
class Login extends React.Component{
    constructor(props){
      super(props);
      this.state={ 
        loginemail:"",
        loginpassword:"",
        firstName:"",
        lastName:"",
        email:"",
        mobilenumber:"",
        password:"",
        success:false,
        data:{},
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
      foredit()
      {
        alert("came into edit")
      }
  
      handlelogin(e){
        let logindata={
          email:this.state.loginemail,
          password:this.state.loginpassword
        }
        console.log("entered handle login method")
        e.preventDefault()
        axios
        .post('http://ec2-18-218-72-224.us-east-2.compute.amazonaws.com:3000/api/v1/users/login',logindata)
        .then(response =>{
          this.setState({data:response})
          Updatestate({logindata:this.state.data})
          Updatestate({login:false})
          alert("success")
          this.setState({success:true})
          console.log("this is ")
          console.log(this.state.data)
          Updatestate({lists:true})

        })
        .catch(error => {
          alert("Error")
          console.log(error)
        })   
      }
    render(){
     
  return(
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
         <button type="submit" className="btn btn-primary" style={{marginLeft:"5%"}}>LogIn</button> 
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
        )
    }
}
ReactDOM.render(<Main /> , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export {Updatestate}
