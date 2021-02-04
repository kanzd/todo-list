import react, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, Row, Col, Card, Table, Modal, Spinner } from "react-bootstrap";
import { faPlusCircle, faTrash, faThumbsUp, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chart from 'react-apexcharts'
import "./index.css";


import firebase_services from "../../Services/firebase_firestore";

export default class index extends Component {
    state = {
        show: false,
        todo: '',
        deadline: "",
        pendingtodos: [],
        deleteDoc: false,
        completedtodos: [],
        alltodos: [],
        mount:true,
        Loading: true,
    };
    componentDidMount() {
        (async () => {
            var alltodos = await firebase_services.all(window.localStorage.getItem('docid'));
            // var pendingtodos = await firebase_services.pending(window.localStorage.getItem("docid"));
            // var completedtodos = await firebase_services.completed(window.localStorage.getItem('docid'));
            var tempall = [];
            var temppending = [];
            var tempcompleted = [];
            alltodos.forEach((value, index) => {
                var all = this.state.alltodos;
                all.push({ todo: value.data()["todo"], deadline: value.data()["deadline"], status: value.data()['status'], docid: value.ref.path });
                tempall = all;
                this.setState({ alltodos: all });
            });
            // pendingtodos.forEach((value, index) => {
            //     var pending = this.state.pendingtodos;
            //     pending.push({ todo: value.data()["todo"], deadline: value.data()["deadline"], status: value.data()['status'], docid: value.ref.path });
            //     temppending = pending;

            // });
            // completedtodos.forEach((value, index) => {
            //     var all = this.state.completedtodos;
            //     all.push({ todo: value.data()["todo"], deadline: value.data()["deadline"], status: value.data()['status'], docid: value.ref.path });
            //     tempcompleted = all;

            // });
            this.setState({ Loading: false });
            firebase_services.realTime(window.localStorage.getItem("docid"), (snap) => {
                snap.docChanges().forEach((value, index) => {
                    if ((value.doc.data()['status'] == "pending")&&(!this.state.deleteDoc)) {

                        let temp = this.state.pendingtodos;
                        temp.push({ todo: value.doc.data()["todo"], deadline: value.doc.data()["deadline"], status: value.doc.data()['status'], docid: value.doc.ref.path });
                        this.setState({ pendingtodos: temp });
                        let temp2 = this.state.alltodos;
                        temp2.push({ todo: value.doc.data()["todo"], deadline: value.doc.data()["deadline"], status: value.doc.data()['status'], docid: value.doc.ref.path });
                        this.setState({ alltodos: temp2 });

                    }
                    else {
                        let temp = this.state.completedtodos;
                        temp.push({ todo: value.doc.data()["todo"], deadline: value.doc.data()["deadline"], status: value.doc.data()['status'], docid: value.doc.ref.path });
                        this.setState({ completedtodos: temp });


                    }
                    this.setState({ deleteDoc: false });


                })
            });
        })();
        this.setState({mount:false});
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
                <Form style={{ width: "50%", marginLeft: "30%" }}>
                    <Form.Group controlId="formBasicEmail">

                        <Form.Control type="text" placeholder="Enter Todo" onChange={(e) => {
                            this.setState({ todo: e.target.value });
                        }} />

                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">

                        <Form.Control type="text" placeholder="Enter DeadLine" onChange={(e) => {
                            this.setState({ deadline: e.target.value });
                        }} />
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => {
                    this.setState({ show: false });
                    firebase_services.createTodo({ todo: this.state.todo, deadline: this.state.deadline, status: "pending", datetime: Date.now() }, window.localStorage.getItem('user'))
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
                        <Card.Body className="sc hidess">

                            <Table hover>
                                {this.state.Loading ? (<Spinner className="cen" animation="border" variant="danger" />) : <></>}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Todo</th>
                                        <th>DeadLine</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.pendingtodos.map((value, index) => {
                                        return (<tr key={index.toString() + "pen"}>
                                            <td>{index}</td>
                                            <td>{value.todo}</td>
                                            <td>{value.deadline}</td>
                                            <td> <Button variant="success" onClick={(e) => {
                                                var temp = this.state.pendingtodos;
                                                temp = temp.filter((value, index1) => index1 != index);
                                                var temp2 = this.state.alltodos;
                                                temp2 = temp2.filter((value1, index1) => (value1.todo != value.todo) && (value1.deadline != value.deadline));
                                                temp2.push({ todo: value.todo, deadline: value.deadline, status: "completed", docid: value.docid });

                                                this.setState({ pendingtodos: temp, alltodos: temp2 });
                                                firebase_services.updateDoc(value.docid, 'completed')
                                            }}><FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon></Button> <Button variant="danger" onClick={(e) => {
                                                var temp = this.state.pendingtodos;
                                                temp = temp.filter((value, index1) => index1 != index);
                                                var temp2 = this.state.alltodos;
                                                temp2 = temp2.filter((value1, index1) => value1.todo != value.todo);
                                                this.setState({ pendingtodos: temp, alltodos: temp2 });
                                                this.setState({ deleteDoc: true });
                                                firebase_services.deleteDoc(value.docid);
                                            }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button></td>
                                        </tr>);
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card></div>
                    <div style={{ marginTop: "1%" }}>
                        <Card>
                            <Card.Header>COMPLETED</Card.Header>
                            <Card.Body style={{ height: "260px" }} className="sc hidess"   >

                                <Table hover>
                                    {this.state.Loading ? (<Spinner className="cen" animation="border" variant="success" />) : <></>}
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Todo</th>
                                            <th>DeadLine</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.completedtodos.map((value, index) => {
                                            return (<tr key={index.toString() + "com"}>
                                                <td>{index}</td>
                                                <td>{value.todo}</td>
                                                <td>{value.deadline}</td>
                                                <td>Completed</td>
                                            </tr>);
                                        })}
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
                            <Card.Body className="sc hidess">

                                <Table hover>
                                    {this.state.Loading ? (<Spinner className="cen" animation="border" variant="info" />) : <></>}
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Todo</th>
                                            <th>DeadLine</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.alltodos.map((value, index) => {
                                            return (<tr key={index}>
                                                <td>{index}</td>
                                                <td>{value.todo}</td>
                                                <td>{value.deadline}</td>
                                                <td>{value.status}</td>
                                            </tr>);
                                        })}
                                    </tbody>
                                </Table></Card.Body>
                        </Card>
                    </div>
                    <div style={{ marginTop: "1%" }}><Card>
                        <Card.Body>
                            <Chart options={{
                                labels: ['Pending', 'Completed', "Total"]
                            }} series={[this.state.pendingtodos.length, this.state.completedtodos.length, this.state.alltodos.length,]} type="pie" width={500} height={255} />
                        </Card.Body>
                    </Card></div>

                </Col>

            </Row>
            <Button className="buttonss" onClick={(e) => {
                this.setState({
                    show: !this.state.show,
                    todo: "",
                    deadline: "",
                });
            }}>
                <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
        </div>);
    }
}