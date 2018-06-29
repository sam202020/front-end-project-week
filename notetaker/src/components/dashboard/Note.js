import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './dashboard.css';

export default class Note extends Component {
  constructor(props) {
      super(props);
      this.state = {
          id: this.props.id,
          title: this.props.title,
          body: this.props.body,
          userID: this.props.userID,
          displayBody: `${this.props.body.substring(0, 146)}...`
      };
  }

  render() {
    return (
        <Card className="rounded-0"> 
            <CardBody>
                <Link to={{
                    pathname:`/note/${this.state.id}`,
                    state: {
                        id: this.state.id,
                        title: this.state.title,
                        body: this.state.body,
                        userID: this.state.userID
                    }
                 }} style={{ textDecoration: 'none', color: 'black' }}
                >
                    <CardTitle className="text-left card-title font-weight-bold">
                        {this.state.title}
                    </CardTitle>
                </Link>
                <CardText className="text-left">
                    {this.state.body.length > 144 && this.state.displayBody}
                    {this.state.body.length <= 144 && this.state.body}
                </CardText>
            </CardBody>
        </Card>
    )
  }
}
