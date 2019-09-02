import React from "react";
import axios from "axios";
import {Taskcard} from "../cards/viewtaskcard";
import {Updatestate} from "../index";
function globalupdatestate(val){

    this.setState({"edit":true})
    this.setState({"taskid":val},
               () => {
                   console.log("inside global "+this.state.taskid)
               }
               );
    this.GetsingleTask(val);
    
}
function deletetask(val){
   
    axios
    .post('http://127.0.0.1:3000/api/v1/task/delete/'+this.state.userId+'/'+this.state.listId+'/'+val+'/'+this.state.authToken)
    .then(response => {
        alert("Deleted Successfully")
        console.log(response)
        this.componentDidMount();
    })
    .catch(error => {
        alert("error")
        console.log(Error)
    })
 return(
     <div></div>

     )
  
}

class View_tasks extends React.Component{
    constructor(props){
     super(props);
     this.state={
         userId:this.props.userdata.data.data.userDetails.userId,
         listId:this.props.data.listId,
         authToken:this.props.userdata.data.data.authToken,
         taskcontent:"",
         alltasks:undefined,
         edit:"false",
         taskid:undefined,
        }
        globalupdatestate=globalupdatestate.bind(this)
     this.handlesubmit=this.handlesubmit.bind(this);
     this.changehandler=this.changehandler.bind(this);
     this.GetsingleTask=this.GetsingleTask.bind(this);
     this.handle_edit=this.handle_edit.bind(this);
     deletetask=deletetask.bind(this)
    }
  

    GetsingleTask(taskid){

        console.log("this is taskid:"+taskid)
        axios
        .get('http://127.0.0.1:3000/api/v1/task/one/'+this.state.userId+'/'+this.state.listId+'/'+taskid+'/'+this.state.authToken)
        .then(response =>{
            //this.setState({taskcontent:})
            console.log("Entered single task data ")
            console.log(response)
            this.setState({taskcontent:response.data[0].task})
            console.log(response.data[0].task)
            console.log("above is single task response")
        })
        .catch(error =>{
            alert("Error")
            console.log(error)
        })
   

    }
    componentDidMount(){
       
        axios
        .get('http://127.0.0.1:3000/api/v1/task/view/'+this.state.userId+'/'+this.state.listId+'/'+this.state.authToken)
        .then(response =>{
            console.log("this is views response")
            console.log(response)
            console.log("above is views response")
           const fulldata= (response.data).map((td) =><Taskcard key={td.taskId} data={td} logindata={this.state}/> )
           this.setState({alltasks:fulldata})
        })
        .catch(error =>{
            alert("Error")
            console.log(error)
        })

    }
    handle_edit(e){
         e.preventDefault();
         let data={
             listId:this.state.listId,
             userId:this.state.userId,
             taskId:this.state.taskid,
             task:this.state.taskcontent
         }
        axios
        .put('http://127.0.0.1:3000/api/v1/task/edit/'+this.state.userId+'/'+this.state.listId+'/'+this.state.taskid+'/'+this.state.authToken,data)
        .then(response => {
            console.log("This is edited response:")
            console.log(response)
            console.log("above is edited response")
            this.componentDidMount();
        })
        .catch(error =>{
            alert("error")
            console.log(error)
        })
         this.setState({"edit":false})

    }

    handlesubmit(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:3000/api/v1/tasks/create/'+this.state.userId+'/'+this.state.listId+'/'+this.state.authToken,this.state)
        .then(response =>{ 
          
            console.log(response)
            alert("task posted")
            this.componentDidMount();
            
        })
        .catch(error=>{
            alert("error")
           console.log(error)
        })


    }
    changehandler(e){
     this.setState({[e.target.name]:e.target.value})

    }
    render(){
        return(
            <div>

<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    </head>
    <body >
        
                <div style={{ marginBottom: "10%" }}>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-#04192E" style={{ backgroundColor: "#04192E" }}>
                                <a className="navbar-brand" href="#">ToDo List</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbagler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div className="navbar-nav" style={{ marginLeft: "50%" }}>
                                        <a className="nav-item nav-link active" onClick={()=>{ Updatestate({"lists":true}) ;Updatestate({"tasks":false})} }>ViewLists <span
                                            className="sr-only">(current)</span></a>
                                        <a className="nav-item nav-link active" onClick={()=>{ Updatestate({"createlist":true}) ;Updatestate({"tasks":false})} }>CreateLists</a>
                                        <a className="nav-item nav-link active" onClick={()=>{ Updatestate({"login":true}) ;Updatestate({"tasks":false})} }>Logout</a>
                                    </div>
                                </div>
                            </nav>
                        </div>
            <form onSubmit={this.state.edit==true ? this.handle_edit: this.handlesubmit}>
            <input type="text" 
            name="taskcontent" 
            value={this.state.taskcontent} 
            style={{width:"75%",marginTop: "2%",marginRight: "10%",marginLeft: "10%",marginBottom: "2%",maxLength:"35" }}  
            onChange={this.changehandler}    />
            <br />
             <button  className="btn btn-success" style={{marginLeft: "40%",marginBottom: "2%"}}  >submit</button>
            </form>
        </body>
        </html>
           {this.state.alltasks}
            </div>
        )
    }

}
export default View_tasks;
export {globalupdatestate}
export {deletetask}