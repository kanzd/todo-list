import react, { Component,useState } from "react";
import {Card,Button,Form,Modal,Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import { faPlusCircle, faTrash, faThumbsUp, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./index.css";

import firebase_services from "../../Services/firebase_firestore";
class index extends Component{
    state = {show:false,projectTitle:"",about:"",projectList:[],loading:true};
    async getProjects()
    {
        var data = await firebase_services.getProjects(window.localStorage.getItem('docid'));
        var templist=[];
      Object.keys(data).forEach((value,index)=>{
          if(value!="email")
          {
            templist.push({name:value,about:data[value]});
          }
      });
      this.setState({projectList:templist,loading:false});

    }
    componentDidMount()
    {
        this.getProjects();
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
                    Add Project
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{ width: "50%", marginLeft: "30%" }}>
                    <Form.Group controlId="formBasicEmail">

                        <Form.Control type="text" placeholder="Enter Project Name" onChange={(e) => {
                            this.setState({ projectTitle: e.target.value });
                        }} />

                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">

                        <Form.Control type="text" placeholder="About Project" onChange={(e) => {
                            this.setState({ about: e.target.value });
                        }} />

                    </Form.Group>

                   


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={async (e) => {
                    this.setState({ show: false,loading:true,projectList:[] });
                   await  firebase_services.createProject(window.localStorage.getItem('docid'),this.state.projectTitle,this.state.about);
                   await this.getProjects();

                }}>Add</Button>
            </Modal.Footer>
        </Modal>);
    }
render()
{
    return (<div>
        {this.state.loading?
  <Spinner style={{marginLeft:"50%",marginTop:"40%"}} animation="border" variant="info" />:<></>}
        {this.model()}
        {this.state.projectList.map((value,index)=>(  <Card style={{width:"50%",marginLeft:"25%",marginTop:"1%"}}>
      <Card.Header as="h5">{value.name}</Card.Header>
      <Card.Body>
        <Card.Title>{value.about}</Card.Title>
        
       <Link to = {`/home/${value.name}`}><Button variant="primary">Open Project</Button></Link> 
      </Card.Body>
    </Card>))}
      
    <Button className="buttonss" onClick={(e) => {
                this.setState({
                    show: !this.state.show,
                   projectTitle:"",
                   about:"",
                });
            }}>
                <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
    </div>);
}

}

export default index;