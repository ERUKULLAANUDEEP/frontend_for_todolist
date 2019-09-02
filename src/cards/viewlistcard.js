import React from "react";
import {Updatestate} from "../index"
import View_tasks from "../tasks/viewtasks"

function update(data){
    console.log("inside update")
    console.log(data)
    Updatestate({"taskdata":data})
    Updatestate({"tasks":true})
    Updatestate({"lists":false})

return(
    <div></div>
)    
}

function ListCard(props){
    return(
        <div>
       <html>
       <head>
           <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
               integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
           </head>
       <body>
           <div className="shadow p-3 mb-5 bg-white rounded">
              <div className="container">
                <div className="row" >
                       <div className="col-md-6">
                   <div className="card text-white bg-info " style={{maxWidth: "18rem",marginBottom: "5%"}}>
                              
                               <div className="card-body">
                                       <h5 className="card-title">{props.data.title}</h5>
                                       <small className="text"  style={{fontFamily: "Comic Sans MS",marginLeft: "50%"}}>checking</small>
                                       <hr/>
                                       <p className="card-text">{props.data.description}</p>
                                                   <a href="/view" className="btn btn-dark" style={{marginRight: "5%",width:"30%"}}>Edit</a>
                                                   <button className="btn btn-dark"  style={{marginRight: "5%",width:"30%" }} onClick={()=> update(props.data)}>View</button>
                                                   <button   className="btn btn-dark"  style={{width:"30%" }}>Delete</button>
                                       <p className="card-text" >
                                           <small className="text"  style={{fontFamily: "Comic Sans MS",marginLeft: "50%"}}>Created </small>
                                       </p>
                                   </div>
                               </div>
                       </div>
                   </div>   
           </div>
     </div>
     </body>
     </html>
     </div>
    )
 }
export  {ListCard};
