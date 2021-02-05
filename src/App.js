import {BrowserRouter,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Components/Login/index";
import Home from "./Components/Home/index";
import Navbar2 from "./Components/Navbar/index";
import Project from "./Components/Project/index";
function App() {

  return (
    <BrowserRouter>
    <Route exact path="/"> <Login></Login></Route>
    <Route exact path="/home/:project" render={(props)=>(<><Navbar2 project={props.match.params.project} val={"home"} /> <Home {...props} /></>)}></Route>
    <Route exact path="/project"><Navbar2 /> <Project /></Route>
    </BrowserRouter>
  );
}

export default App;
