import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./components/Details";

class App extends Component {
  render() {
    return (
      <Router basename="/JSON_Data_Search">
        <div className="App">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/detail/:id" component={Details} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
