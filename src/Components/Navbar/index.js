import {faArrowAltCircleRight,faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar,Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {useHistory,NavLink} from 'react-router-dom';
import "./index.css";

const NavBar=(props)=>
{
    let history = useHistory();


    return (<> 
    <Navbar bg="dark"  variant="dark">
    <Navbar.Brand href="#home"><div>{props.val=="home"?<Nav.Item >{props.project}</Nav.Item>:<>Kanz Todo</>}</div></Navbar.Brand>
    <Nav className="mr-auto tt">
    {props.val=="home"?<></>:<Nav.Item>
            {window.localStorage.getItem("user")}
          
        </Nav.Item>}
   
        {props.val=="home"?<NavLink style={{marginLeft:"2%"}} to="/project"> <Button variant="outline-warning"><FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon></Button></NavLink>:<></>}
        
       
    </Nav>

 
        <Button style={{marginLeft:"70%"}} variant="outline-info" onClick={(e)=>{
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("docid");
            history.push('/');
        }}><FontAwesomeIcon icon={faArrowAltCircleRight}></FontAwesomeIcon> Logout</Button>
 
</Navbar>
</>);
}

export default NavBar;