import React from "react";
import axios from "axios";
import {Updatestate}  from "../index"

class Form_of_list extends React.Component{

    constructor(props){
        super(props)
        this.state={
            userId:"",
            title:"",
            description:"",
            priority:"",
            createdlist:{},
            edit:"",
            listId:undefined
        }
  this.updateformstate=this.updateformstate.bind(this)
  //console.log(this.props.logindata.data.data.userDetails.userId)
  this.ChangeHandler=this.ChangeHandler.bind(this)
  this.Fetching_CreateList=this.Fetching_CreateList.bind(this)
  this.editsubmit=this.editsubmit.bind(this)
this.getsinglelistdata=this.getsinglelistdata.bind(this);
console.log("entered create lists")

}
componentDidMount(){
    this.setState({"edit":this.props.edit})
    this.setState({"userId":this.props.logineddata.data.data.userDetails.userId})

    if(this.props.edit)
    {
        console.log("This inside edit" )
       this.getsinglelistdata();
    }
}


getsinglelistdata(){

    this.setState({"listId":this.props.listId})
    this.setState({"userId":this.props.logineddata.data.data.userDetails.userId})
    axios
    .get('http://ec2-18-218-72-224.us-east-2.compute.amazonaws.com:3000/api/v1/list/'+this.props.logineddata.data.data.userDetails.userId+'/'+this.props.listId +'/'+this.props.logineddata.data.data.authToken)
     .then(response => {
         console.log(response)

        let obj={
            "title":response.data[0].title,
            "description":response.data[0].description,

        }

         this.setState(obj);
     })
     .catch(error=>{
         alert(error);
     })



}

updateformstate(val){

    this.setState(val)
   this.setState({"edit":true})
    
}
    ChangeHandler(e){
        const {name,value}=e.target;
        this.setState({[name]:value})
        //5CIj5UUH1
    }
    Fetching_CreateList(e){
        e.preventDefault()
      console.log("From Props")
      console.log(this.props.logineddata.data.data.authToken)
      console.log("after props")
      //  alert(this.props.logindata.data.data.userDetails.userId)
        this.setState({userId:this.props.logineddata.data.data.userDetails.userId})
        axios
        .post('http://ec2-18-218-72-224.us-east-2.compute.amazonaws.com:3000/api/v1/lists/create/'+this.props.logineddata.data.data.userDetails.userId+'/'+this.props.logineddata.data.data.authToken,this.state)
        .then(response=>{
         console.log(response)
         alert("Posted the list")
         Updatestate({"createlist":false})
        })
        .catch(error=>{console.log("error")})

    }
    editsubmit(e){
        e.preventDefault()
      console.log("From Props")
      console.log(this.props.logineddata.data.data.authToken)
      console.log("after props")
      this.setState({userId:this.props.logineddata.data.data.userDetails.userId})

      //  alert(this.props.logindata.data.data.userDetails.userId)
        axios
        .put('http://ec2-18-218-72-224.us-east-2.compute.amazonaws.com:3000/api/v1/lists/edit/'+this.props.logineddata.data.data.userDetails.userId+'/'+this.props.listId+'/' +this.props.logineddata.data.data.authToken,this.state)
        .then(response=>{
         console.log(response)
         alert("edited the list")
         Updatestate({"listsedit":false})
        })
        .catch(error=>{console.log("error")})

    }

    render(){
       // console.log(this.props.logindata)

        return(

            <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
            </head>
            <body>
                <div style={{marginBottom: "10%" }}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-#04192E" style={{ backgroundColor:"#04192E" }} >
                        <a className="navbar-brand" href="#">ToDo List</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav" style={{marginLeft:"50%"}}>
                                <a className="nav-item nav-link active" onClick={() =>{this.props.edit? Updatestate({"listsedit":false}) : Updatestate({"createlist":false}) }} >ViewLists <span
                                        className="sr-only">(current)</span></a>
                                <a className="nav-item nav-link active" >CreateLists</a>
                                <a className="nav-item nav-link active">Logout</a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="container">
                    <h2 align="center">Create List</h2>
                    <div className="row" style={{textAlign:"left" ,marginLeft:"25%", marginRight:"25%"}}>
                        <div className="col-md-12">
                            <form >
            
                                <div className="form-group">
            
                                    <label>List Title</label>
                                    <input type="text" name="title" value={this.state.title}   className="form-control" placeholder="Enter List Title" onChange={this.ChangeHandler}
                                        required />
            
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea name="description" value={this.state.description} className="form-control" rows="3" onChange={this.ChangeHandler}     required></textarea>
                                </div>
           
                             <button  className="btn btn-success" onClick={ this.props.edit   ? this.editsubmit : this.Fetching_CreateList }  >Post the List</button>
            
                            </form>
            
                        </div>
            
                    </div>
            
                </div>
                        </body>
            
            </html>
        )

    }
}
const listform=new Form_of_list();
export  {listform};
export default Form_of_list
