import React, { Component } from 'react';


export default class Main extends Component {
   componentDidMount(){
       this.props.auth.login();
   }

    render() {
       
        return (
            <div>
            {/* <p className="App-intro">
                Hello {this.props.name}!
                email {this.props.useremail}
                id {this.props.userID}
    
            Do you want to see the secret area? <a href="/secret">click here</a>
            </p>
            {!this.props.auth.isAuthenticated() &&

            (<div>
                <h1>
                    Please login first
                </h1>
                <button onClick={this.props.auth.login}>Login</button>
            </div>) 
            } */}
           
            </div >
        )
    }
}