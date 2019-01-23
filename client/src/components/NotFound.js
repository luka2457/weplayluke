import React, { Component } from 'react';
import {Row, Col, Navbar} from 'react-materialize';


export default class NotFound extends Component {
    render() {
        return (
        <Row>
            <Col s={12}>
          <Navbar className="cyan darken-3 center">
            <h4>WePlay</h4>
            
          </Navbar>
          <h2 className="center">Page not found</h2>

          <p className="App-intro center">
                Hello{this.props.name}!
                {this.props.useremail}
                {this.props.userID}
    
            {" "} Looking for WePlay? <a href="/">click here</a>
            </p>
            </Col>
        </Row>
        )
    }
}