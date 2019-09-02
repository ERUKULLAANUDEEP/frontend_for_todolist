import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logine from './logincomponent/login';
import lists from './viewlists/lists';

class Sample extends React.Component{

     list1(){
<h1>hello world</h1>
    }
    welcome(){
        <h1>welcome from login page</h1>
    }
    render(){
        return(
<Router>
    <switch>
    <Route exact path="/" component={welcome} />
    <Route exact path="/view"  render={()=><lists1 />}/>    
    </switch>
</Router>        
        )
    }
}
ReactDOM.render(<sample />  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
export default Sample
 