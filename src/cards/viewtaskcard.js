import React from "react";
import axios from "axios";
import {globalupdatestate} from "../tasks/viewtasks";
import {deletetask} from "../tasks/viewtasks";
import View_tasks from "../tasks/viewtasks";
function Deletetask(prop,taskId){
     /*
        alert("Entered deleted")
       axios
       .post('http://127.0.0.1:3000/api/v1/task/delete/'+prop.userId+'/'+prop.listId+'/'+taskId+'/'+prop.authToken)
       .then(response => {
           alert("Deleted Successfully")
           console.log(response)
       })
       .catch(error => {
           alert("error")
           console.log(Error)
       })
    return(
        <div></div>

        )*/
        deletetask(taskId);
       
}

function Edittask(prop,taskId){

    globalupdatestate(taskId)


}





function Taskcard(props){

    return(
        <div>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    </head>
    <body>

            <div className="container">
            <div className="row">
                    <div  className="col-md-12">
                            <div className="fortask">{props.data.task}<span><div><button className="btn btn-success"style={{marginLeft:"75% "}} onClick={()=>{Edittask(props.logindata,props.data.taskId)}} >Edit</button><button  class="btn btn-danger" style={{marginLeft:"75%"}} onClick={()=>{Deletetask(props.logindata,props.data.taskId)}} >Del</button></div></span></div>            
                        </div>

            </div>
            </div>
            </body>
</html>
            
        </div>
    )
}
export {Taskcard}