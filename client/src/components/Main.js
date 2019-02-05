import React, { Component } from 'react';


export default class Main extends Component {
   componentDidMount(){
       this.props.auth.login();
   }

    render() {
       
        return (
            <div>           
            </div>
        )
    }
}