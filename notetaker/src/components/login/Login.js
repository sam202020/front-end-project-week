import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newNoteTitle: '',
            newNoteBody: '',
            redirect: false,
            userID: '',
            invalidCreds: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/users/login', 
            { "username": this.state.newNoteTitle, "password": this.state.newNoteBody })
            .then(res => {
                this.setState({
                    userID: res.data._id,
                    redirect: true
                })
            })
            .catch(error => {
                console.error('Server Error', error);
                this.setState({
                    invalidCreds: true
                })
            });
    }

    render() {
        const { redirect, userID, invalidCreds } = this.state
        if (redirect)
            return (<Redirect to={{
                pathname: '/',
                state: { userID: userID }
            }} />)
        return ( 
        <div>
            <Container className="container">
                <Row className="border">
                    <Col xs="3" className="sidebar">
                        <h1 className="mt-3 text-left heading">Lambda Notes</h1>
                        <Link to="/">
                            <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">
                                View Your Notes
                            </button>
                        </Link>
                        <Link to="/">
                            <button type="button" className="mt-4 btn btn-lg btn-block rounded-0">
                                + Create New Note
                            </button>
                        </Link>
                    </Col>
                    <Col xs="9" className="main">
                        <Row className="ml-3 mt-5 pt-4 mb-4">
                            <h4 className="text-left heading">Login to view your notes:</h4>
                        </Row>
                        <Row className="mb-4">
                            <Col xs="7" className="ml-3">
                                <Input placeholder="Username" 
                                className="note-title-input" 
                                onChange={this.handleChange}
                                value={this.state.newNoteTitle} 
                                name="newNoteTitle" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" className="ml-3 pr-5">
                                <textarea placeholder="Password: At least 4 characters." 
                                className="rounded note-content-input" 
                                onChange={this.handleChange} 
                                value={this.state.newNoteBody} 
                                name="newNoteBody"></textarea>
                            </Col>
                            <Col xs="4" className="ml-3">
                                <button
                                type="submit"
                                className="button mt-4 btn btn-lg btn-block rounded-0" 
                                onClick={this.submitHandler}> 
                                Login</button>
                            </Col>
                            {invalidCreds === true && <h2>Invalid Credentials</h2>}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}
