import "babel-polyfill";

import React, { Component } from 'react';
import QuestionList from 'components/QuestionList.js';
import Filter from 'components/Filter.js';
import InputPlaceholder from 'components/InputPlaceholder.js';



export default class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      requestFailed: false,
    }
    
    this.requestFailedHandler = this.requestFailedHandler.bind(this);
  }
  
  requestFailedHandler() {
    this.setState({
      requestFailed: true
    })
  }
  
  render() {
    if(this.state.requestFailed) return <h2>Network Error.</h2>
    return (
    <div className="wrapper">
      <div className="side">
        <Filter></Filter>
      </div>
      <div className="main">
        <div className="intro">
          <h1>Welcome to the first week of digital media. 🚀</h1>
          <p>
            This Initializer will help you survive the first week in Bremen.
            <br /> We have a great program for you lined up.
          </p>
        </div>
        <InputPlaceholder></InputPlaceholder>
        <QuestionList></QuestionList>
      </div>
    </div>
    );
  }
}

