import {BrowserRouter,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Components/Login/index";
import Home from "./Components/Home/index";
import Navbar2 from "./Components/Navbar/index";

function App() {

  return (
    <BrowserRouter>
    <Route exact path="/"> <Login></Login></Route>
    <Route exact path="/home"><Navbar2 /> <Home /></Route>
    </BrowserRouter>
  );
}

export default App;
