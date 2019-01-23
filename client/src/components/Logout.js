import React, { Component } from 'react';
import { Row, Col, Navbar, NavItem, Button} from 'react-materialize';


export default class NotFound extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col s={12}>
                        <Navbar className="cyan darken-3 center">
                            <h4>WePlay</h4>
                            <NavItem>
                            </NavItem>
                        </Navbar>
                {!this.props.auth.isAuthenticated() &&

                    (<div>
                        <h1>You have successfully logged out!</h1>
                        <h1>
                            Please login
                        </h1>
                        <Button onClick={this.props.auth.login}>Login</Button>
                    </div>)
                }

                    </Col>
                </Row>
            </div>
        )
    }
}