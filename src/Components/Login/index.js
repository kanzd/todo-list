import gitLogin from "../../Services/firebase_auth";
import react ,{useState} from "react";
import {Button,Image} from "react-bootstrap";
import image from "../../images/GitHub-Mark/PNG/GitHub-Mark-120px-plus.png";
import "./index.css";
import { useHistory } from "react-router-dom";

const Login = (props)=>{
    let history  = useHistory();
    const [auth,setAuth] = useState(false);
    (()=>{
        
   if(window.localStorage.getItem("user")!=null)
   {
       history.push('/home');
   }
    })();
    return (<div >
        <div className="all">
            <div>  <img src={image} height={200} style={{margin:"10%"}} /></div>
      
         <Button onClick={async()=>{
            let authVal= await gitLogin();
     
            window.localStorage.setItem("user",authVal.user.email);
            history.push('/home');
          
          
         }} style={{marginLeft:"29%"}} variant="outline-success">Auth With Git</Button>
        </div>
        

    </div>);
}

export default Login;