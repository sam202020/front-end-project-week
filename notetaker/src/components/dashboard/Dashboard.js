import React, { Component } from 'react';
import { Container, Row, Col, } from 'reactstrap';
import './dashboard.css';
import { Link } from 'react-router-dom';
import Note from './Note';
import axios from 'axios';

export default class Dashboard extends Component {
    
  constructor(){
      super();
      this.state = {
          notes: []
      };
  }

  componentDidMount() {
    if (this.props.location.state) {
        axios
        .get(`http://localhost:5000/api/notes/${this.props.location.state.userID}`)
        .then(response => {
            this.setState({ notes: response.data });
            console.log(this.props.location.state.userID);
        })
        .catch(error => {
            console.error('Server Error', error);
        });
    }
  }

  render() {
    if (!this.props.location.state) return (
        <div>
            Please Sign In:<br></br>
            <Link to='/signup'>New User</Link>
        </div>
    )
    return (
        <div>
            <Link to='/signup'>New User</Link>
            <Container className="container">
                <Row className="border">
                    <Col xs="3" className="sidebar">
                        <h1 className="mt-3 text-left heading">Lambda Notes</h1>
                        <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">
                            View Your Notes
                        </button>
                        <Link to={{
                            pathname: "/create",
                            state: { userID: this.props.location.state.userID }
                        }}>
                            <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">
                                + Create New Note
                            </button>
                        </Link>
                    </Col>
                    <Col xs="9" className="main">
                        <Row className="ml-2 mt-5 pt-4 mb-4">
                            <h4 className="text-left heading">Your Notes:</h4>
                        </Row>
                        <Row className="mb-4">
                        {this.state.notes.map(note =>
                            <Col xs="4" className="mb-4" key={note._id}>
                            <Note
                            key={note._id} 
                            id={note._id}
                            title={note.title}
                            body={note.body}
                             />
                            </Col>
                        )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }
}
