import react, { Component } from "react";
import { Navbar,Nav,Form, FormControl, Button, Row, Col, Card, Table, Modal } from "react-bootstrap";
import { faPlusCircle, faTrash, faThumbsUp,faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chart from 'react-apexcharts'
import "./index.css";
import firebase_services from "../../Services/firebase_firestore";

export default class index extends Component {
    state = {
        show: false,
        todo:'',
        deadline:"",
        pendingtodos:[],
        completedtodos:[],
        alltodos:[],
    };
    componentDidMount(){
        (async ()=>{
            var alltodos = await firebase_services.all(window.localStorage.getItem('docid'));
            var pendingtodos = await firebase_services.pending(window.localStorage.getItem("docid"));
            var completedtodos = await firebase_services.completed(window.localStorage.getItem('docid'));
            var tempall=[];
            var temppending=[];
            var completedpending=[];
            
         
        })();
    }
    model() {
        return (<Modal
            show={this.state.show}
            onHide={(e) => {
                this.setState({ show: false });
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Todo
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form style={{width:"50%",marginLeft:"30%"}}>
  <Form.Group controlId="formBasicEmail">
   
    <Form.Control type="text" placeholder="Enter Todo" onChange={(e)=>{
        this.setState({todo:e.target.value});
    }}/>
   
  </Form.Group>

  <Form.Group controlId="formBasicPassword">

    <Form.Control type="text" placeholder="Enter DeadLine" onChange={(e)=>{
         this.setState({deadline:e.target.value});
    }}/>
  </Form.Group>

  
</Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => {
                    this.setState({ show: false });
                    firebase_services.createTodo({todo:this.state.todo,deadline:this.state.deadline,status:"pending",datetime:Date.now()},window.localStorage.getItem('user'))
                }}>Add</Button>
            </Modal.Footer>
        </Modal>);
    }
    render() {
        return (<div>
              
            {this.model()}
            <Row className="rowp">

                <Col>
                    <div>  <Card>
                        <Card.Header>PENDING</Card.Header>
                        <Card.Body className="sc">

                            <Table  hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Todo</th>
                                        <th>DeadLine</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td> <Button variant="success"><FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon></Button> <Button variant="danger"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td> <Button variant="success"><FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon></Button> <Button variant="danger"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan="2">Larry the Bird</td>
                                        <td> <Button variant="success"><FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon></Button> <Button variant="danger"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card></div>
                    <div style={{ marginTop: "1%" }}>
                        <Card>
                            <Card.Header>COMPLETED</Card.Header>
                            <Card.Body style = {{height:"260px"}} className="sc"   >

                               <Table hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Todo</th>
                                            <th>DeadLine</th>
                                            <th>Manage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                           
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                           
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td colSpan="2">Larry the Bird</td>
                                           
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td colSpan="2">Larry the Bird</td>
                                           
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td colSpan="2">Larry the Bird</td>
                                           
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td colSpan="2">Larry the Bird</td>
                                           
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Card >
                            <Card.Header>ALL TODO LIST</Card.Header>
                            <Card.Body className="sc"> <Table    hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Todo</th>
                                        <th>DeadLine</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>Otto</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>Otto</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry the Bird</td>
                                        <td>Otto</td>
                                        <td>Otto</td>
                                      
                                    </tr>
                                </tbody>
                            </Table></Card.Body>
                        </Card>
                    </div>
                    <div style={{ marginTop: "1%" }}><Card>
                        <Card.Body>
                            <Chart options={{
                                labels: ['Pending', 'Completed', "total"]
                            }} series={[44, 55, 41,]} type="pie" width={500} height={255} />
                        </Card.Body>
                    </Card></div>

                </Col>

            </Row>
            <Button className="buttonss" onClick={(e) => {
                this.setState({
                    show: !this.state.show,
                });
            }}>
                <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
        </div>);
    }
}