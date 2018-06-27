import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class EditNote extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            newTitle: this.props.location.state.title,
            newBody: this.props.location.state.body,
            redirect: false,
            userID: ''
        };
    }

    handleInputChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    editNote = e => {    
      e.preventDefault();
      const token = localStorage.getItem('jwt');
      const requestOptions = {
          headers: {
              Authorization: token
          }
      }; 
      axios
        .put(`http://localhost:5000/api/notes/${this.props.location.state.id}`, 
             { "title": this.state.newTitle, "body": this.state.newBody },
             requestOptions
            )
        .then(response => {
            this.setState({
                userID: this.props.location.state.userID,
                redirect: true
            })
        })
        .catch(error => {
            console.error('Server Error', error);
        });
    }

  render() {
    const { redirect, userID } = this.state
        if (redirect)
            return (<Redirect to={{
                pathname: '/',
                state: { userID: userID }
            }} />)      
    return (
    <Container>
        <Row className="border">
            <Col xs="3" className="sidebar">
                <h1 className="mt-3 text-left heading">Lambda Notes</h1>
                <Link to="/">
                    <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">View Your Notes</button>
                </Link>
                <Link to="/create">
                    <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">+ Create New Note</button>
                </Link>
            </Col>
            <Col xs="9" className="main">
                <Row className="ml-3 mt-5 pt-4 mb-4">
                    <h4 className="text-left heading">Edit Note:</h4>
                </Row>
                <Row className="mb-4">
                    <Col xs="7" className="ml-3">
                        <Input placeholder="Note Title" className="note-title-input"
                        onChange={this.handleInputChange} 
                        value={this.state.newTitle}
                        name="newTitle" />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="ml-3 pr-5">
                        <textarea placeholder="Note Content" 
                        className="rounded note-content-input"
                        onChange={this.handleInputChange}
                        value={this.state.newBody}
                        name="newBody"></textarea>
                    </Col>
                    <Col xs="4" className="ml-3">
                        <button type="button" 
                        className="mt-4 btn btn-lg btn-block rounded-0"
                        onClick={this.editNote}>
                            Update
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
    )
  }
}
