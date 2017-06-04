import React, { Component } from 'react';
import Page from './page';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <p className="App-intro">
          This is ENOW
        </p>

        <Page />

      </div>
    );
  }
}

export default App;
