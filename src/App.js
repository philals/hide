import React, { Component } from "react";
import GitHubForkRibbon from 'react-github-fork-ribbon';
import LocationState from "./LocationState";

class App extends Component {
  render() {
    return (
      <div>
         <GitHubForkRibbon href="https://github.com/philals/hide"
                    target="_blank"
                    position="right">Fork me</GitHubForkRibbon>
        <LocationState />
      </div>
    );
  }
}

export default App;
