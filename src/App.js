import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./layout/Header";
import InsurancesIndex from "./layout/InsurancesIndex";
import InsurancesCreate from "./layout/InsurancesCreate";
import InsurancesShow from "./layout/InsurancesShow";
import InsurancesEdit from "./layout/InsurancesEdit";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={InsurancesIndex} />
            <Route exact path="/create" component={InsurancesCreate} />
            <Route path="/insurances/edit/:id" component={InsurancesEdit} />
            <Route path="/insurances/:id" component={InsurancesShow} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
