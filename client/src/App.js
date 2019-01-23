import React, { Component } from "react";
import Games from "./pages/Games";
import Main from "./components/Main";
import Logout from "./components/Logout";
import Callback from "./components/Callback";
require('dotenv').config();


class App extends Component {
  render() {
    let mainComponent;
    
    switch(this.props.location) {
      case "":
        mainComponent = this.props.auth.isAuthenticated() ? <Games {...this.props} /> : <Main {...this.props}/>
        break;
      case "callback":
        mainComponent = <Callback />
        break;
      case "secret":
        mainComponent = this.props.auth.isAuthenticated() ? <Games {...this.props} /> : <Main {...this.props} />
        break;
      case "logout":
        mainComponent = <Logout {...this.props} />
        break;
      default:
        mainComponent = this.props.auth.isAuthenticated() ? <Games {...this.props} /> : <Main {...this.props}/>
    }
    return (
      <div className="App">
          {mainComponent}
      </div>
    );
  }
}

export default App;
