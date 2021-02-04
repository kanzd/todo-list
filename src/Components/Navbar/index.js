import {faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar,Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import "./index.css";

const NavBar=(props)=>
{
    let history = useHistory();

    return (<> 
    <Navbar bg="dark"  variant="dark">
    <Navbar.Brand href="#home"><div>Kanz Todo</div></Navbar.Brand>
    <Nav className="mr-auto tt">
        <Nav.Item>
            {window.localStorage.getItem("user")}
        </Nav.Item>
    </Nav>

 
        <Button style={{marginLeft:"75%"}} variant="outline-info" onClick={(e)=>{
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("docid");
            history.push('/');
        }}><FontAwesomeIcon icon={faArrowAltCircleRight}></FontAwesomeIcon> Logout</Button>
 
</Navbar>
</>);
}

export default NavBar;