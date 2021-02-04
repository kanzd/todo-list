import {faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar,Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom';


const NavBar=(props)=>
{
    let history = useHistory();

    return (<> 
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Kanz Todo</Navbar.Brand>
   
 
        <Button style={{marginLeft:"86%"}} variant="outline-info" onClick={(e)=>{
            window.localStorage.removeItem("user");
            history.push('/');
        }}><FontAwesomeIcon icon={faArrowAltCircleRight}></FontAwesomeIcon> Logout</Button>
 
</Navbar>
</>);
}

export default NavBar;