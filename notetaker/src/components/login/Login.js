import React, { Component } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
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
            invalidCreds: false,
            forgotPassword: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value }, () => console.log(this.state));
    }

    handleChange = e => {
        this.setState({ forgotPassword : true }, () => console.log(this.state));
    }

    componentDidMount() {
        localStorage.clear();
    }

    submitHandler = e => {
        e.preventDefault();
        axios
            .post('https://note-app-sam.herokuapp.com/api/users/login', 
            { "username": this.state.newNoteTitle, "password": this.state.newNoteBody })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('jwt', res.data.token);
                  } else {
                    console.log('problem')
                  }
                this.setState({
                    userID: res.data.user._id,
                    redirect: true
                })
            })
            .catch(error => {
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
                    <Col lg="3" className="sidebar">
                        <h1 className="mt-3 text-left heading">Lambda Notes</h1>
                    </Col>
                    <Col lg="9" className="mt-5 pt-4 mb-4">
                        
                            <h4 className="text-left heading">Login to view your notes:</h4>
                       
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
                            <Col xs="8" className="ml-3 pr-5">
                                <Input placeholder="Password: At least 4 characters." 
                                className="rounded note-title-input" 
                                onChange={this.handleChange} 
                                value={this.state.newNoteBody} 
                                name="newNoteBody"
                                type="password"/>
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
                        <Row>
                            <Col xs="8" className="ml-3 pr-5">
                                <Button
                                onChange={this.handleChangeButton} 
                                value={true}
                                > I Forgot My Password</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}
