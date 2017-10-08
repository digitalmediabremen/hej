import "babel-polyfill";

import React, { Component } from 'react';
import QuestionList from 'components/QuestionList.js';
import Filter from 'components/Filter.js';
import InputPlaceholder from 'components/InputPlaceholder.js';
import { withRouter } from 'react-router-dom';


class HomeView extends Component {
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
  
  componentDidMount() {
    if(localStorage) {
      if(localStorage.getItem("selected-filters") === null) {
        this.props.history.push("/select");
      } else {
        console.log(localStorage.getItem("selected-filters"))
      }
    }
  }

  render() {
    if(this.state.requestFailed) return <h2>Network Error.</h2>
    return (
    <div className="wrapper">
      <div className="side">
        <Filter showStaticFilters={false}></Filter>

      </div>
      <div className="main">
        <div className="intro">
          <h1>Welcome to your first week of digital media. 🚀</h1>
          <p>Nice to have you! This programme is your guide into the orientation days of studying digital media. We are happy answer your questions here and share them with everybody.<br/>Something urgent? Call us at <a href="tel:+4942195951304">+49 (0)421 9595-1304</a>.<br/>Have a great start and a lot of fun!
          </p>
        </div>
        <InputPlaceholder></InputPlaceholder>
        <QuestionList></QuestionList>
      </div>
    </div>
    );
  }
}

export default withRouter(HomeView)
