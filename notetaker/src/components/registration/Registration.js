import React, { Component } from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";
import { Redirect } from "react-router";
import axios from "axios";


// todo add for forgot your password option
export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteTitle: "",
      newNoteBody: "",
      email: '',
      invalidEmail:false,
      redirect: false,
      userID: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkForValidEmailAddress = () => {
    const { email } = this.state;
    const isValidEmail = this.validateEmail(email);
    if (isValidEmail === true) return true;
    return false;
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  submitHandler = e => {
    e.preventDefault();
    if (this.checkForValidEmailAddress() === false) {
        this.setState({invalidEmail: true, email: ''})
    }
    // axios
    //   .post("https://note-app-sam.herokuapp.com/api/users", {
    //     username: this.state.newNoteTitle,
    //     password: this.state.newNoteBody,
    //     emailAddress: this.state.email
    //   })
    //   .then(res => {
    //     if (res.data.token) {
    //       localStorage.setItem("jwt", res.data.token);
    //     } else {
    //       // TODO: ERROR MESSAGE
    //     }
    //     this.setState({
    //       userID: res.data.user._id,
    //       redirect: true
    //     });
    //   })
    //   .catch(error => {
    //     console.error("Server Error", error); // TODO: ERROR MESSAGE in browser
    //   });
  };

  render() {
    const { redirect, userID, invalidEmail } = this.state;
    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { userID: userID }
          }}
        />
      );
    return (
      <div>
        <Container className="container">
          <Row className="border">
            <Col xs="3" className="sidebar">
              <h1 className="mt-3 text-left heading">Lambda Notes</h1>
            </Col>
            <Col xs="9" className="main">
              <Row className="ml-3 mt-5 pt-4 mb-4">
                <h4 className="text-left heading">New User Registration:</h4>
              </Row>
              <Row className="mb-4">
                <Col xs="7" className="ml-3">
                  <Input
                    placeholder="Username"
                    className="note-title-input"
                    onChange={this.handleChange}
                    value={this.state.newNoteTitle}
                    name="newNoteTitle"
                  />
                </Col>
              </Row>
              <Row>
              <Col xs="8" className="ml-3 mb-4 pr-5">
                  <Input
                    placeholder="Email Address"
                    className="rounded note-title-input"
                    onChange={this.handleChange}
                    value={this.state.email}
                    name="email"
                  />
                </Col>
                <Col xs="8" className="ml-3 pr-5">
                  <Input
                    placeholder="Password: At least 4 characters."
                    className="rounded note-title-input"
                    onChange={this.handleChange}
                    value={this.state.newNoteBody}
                    name="newNoteBody"
                    type="password"
                  />
                </Col>
                <Col xs="4" className="ml-3">
                  <button
                    type="submit"
                    className="button mt-4 btn btn-lg btn-block rounded-0"
                    onClick={this.submitHandler}
                  >
                    Sign Up
                  </button>
                </Col>
              </Row>
              <Row mt="5">


                  <Col className='mt-5'>
                  
                  
                  
                  {invalidEmail && <h1 style={{color:'red'}}>Invalid Email Address, Please Re-enter.</h1>}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
