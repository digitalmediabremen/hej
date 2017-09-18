import React, { Component } from 'react';
import Feed from './Feed.js';
import Filter from './Filter.js';
import Input from './Input.js';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      requestFailed: false,
      filters: []
    }
    
    this.requestFailedHandler = this.requestFailedHandler.bind(this);
    this.filterChangedHandler = this.filterChangedHandler.bind(this);
  }
  
  requestFailedHandler() {
    this.setState({
      requestFailed: true
    })
  }
  
  filterChangedHandler(filters) {
    this.setState({
      filters: filters
    });
  }
  
  render() {
    if(this.state.requestFailed) return <h2>Network Error.</h2>
    return (
      <div className="App">
        <div className="side">
          <Filter 
            onRequestFailed={this.requestFailedHandler} 
            filters={this.state.filters}
            onFilterChange={this.filterChangedHandler}></Filter>
        </div>
        <div className="main">
          <Input></Input>

          <Feed 
            onRequestFailed={this.requestFailedHandler}
            filters={this.state.filters}></Feed>
        </div>
      </div>
    );
  }
}

export default App;
