import React, { Component } from 'react';
import Feed from './Feed.js';
import {Filter, FilterSettings} from './Filter.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      requestFailed: false,
      apiUrl: `https://api.github.com/repos/jelko/digitalehilfe`,
      filterSettings: new FilterSettings()
    }
    
    this.requestFailedHandler = this.requestFailedHandler.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
  }
  
  requestFailedHandler() {
    this.setState({
      requestFailed: true
    })
  }
  
  filterHandler(filterSettings) {
    this.setState({
      filterSettings: filterSettings 
    });
  }
  
  render() {
    if(this.state.requestFailed) return <h2>Network Error.</h2>
    return (
      <div className="App">
        <Filter 
          requestFailedHandler={this.requestFailedHandler} 
          apiUrl={this.state.apiUrl}
          filterSettings={this.state.filterSettings}
          filterHandler={this.filterHandler}></Filter>

        <Feed 
          requestFailedHandler={this.requestFailedHandler}
          apiUrl={this.state.apiUrl}
          filterSettings={this.state.filterSettings}></Feed>
      </div>
    );
  }
}

export default App;
