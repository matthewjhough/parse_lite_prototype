import React, { Component } from "react";
import ParseLite from "./parse-lite/parselite";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  parseLite = new ParseLite();
  state = {
    value: "",
    foo: "bar",
    test: 5
  };

  componentDidMount() {
    // const parseLite = new ParseLite(window.location.search);
    console.log("PARSELITE: ", this.parseLite);
  }

  changeValue = e =>
    this.setState({
      value: e.target.value
    });

  updateParams = () => {
    this.parseLite.updateURL(this.state);
    console.log(this.parseLite);
  };

  // todo : flesh out
  clearParams = () => this.parseLite.removeURLParameter("query");

  render() {
    console.log("current state:", this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <input
          placeholder="enter a URL Param..."
          onChange={this.changeValue}
          value={this.state.value}
        />
        <button onClick={this.updateParams}>Push state</button>
      </div>
    );
  }
}

export default App;
