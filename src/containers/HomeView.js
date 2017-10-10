import "babel-polyfill";

import React, { Component } from 'react';
import QuestionList from 'components/QuestionList.js';
import Filter from 'components/Filter.js';
import InputPlaceholder from 'components/InputPlaceholder.js';
import { withRouter, Link } from 'react-router-dom';
import withSelectedFilters from "utils/withSelectedFilters.js";



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
        this.props.history.push("/select-your-track");
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
        <Filter />
      </div>
      <div className="main">
        <div className="intro">
          <h1>Welcome to your first week of digital media. 🚀</h1>
          <p>Nice to have you! This programme is your guide into the orientation days of studying digital media. We are happy to answer your questions here and share them with everybody.<br/>Something urgent? Call us at <a href="tel:+4942195951304">+49 (0)421 9595-1304</a>.<br/>Have a great start and a lot of fun!
          
          <Link to="/select-your-track" className="change-track-link">
            { this.props.selectedStaticFilter && <span> change track <b>{this.props.selectedStaticFilter}</b></span>}  
            { !this.props.selectedStaticFilter && <span> Select your track </span>}  
          </Link>
          </p>
        </div>
        <InputPlaceholder></InputPlaceholder>
        <QuestionList></QuestionList>
      </div>
    </div>
    );
  }
}

export default withSelectedFilters(withRouter(HomeView))
