import "babel-polyfill";

import React, { Component } from 'react';
import QuestionList from 'components/QuestionList.js';
import Filter from 'components/Filter.js';
import InputPlaceholder from 'components/InputPlaceholder.js';
import { withRouter, Link } from 'react-router-dom';
import withSelectedFilters from "utils/withSelectedFilters.js";
import FilterToggle from "components/FilterToggle.js"
import withData from "utils/withData.js";


class HomeView extends Component {
  constructor() {
    super();

    this.state = {
      requestFailed: false,
    }

    this.requestFailedHandler = this.requestFailedHandler.bind(this);
    this.thanksHandler = this.thanksHandler.bind(this)
  }

  requestFailedHandler() {
    this.setState({
      requestFailed: true
    })
  }

  componentDidMount() {
    let thanks = !!this.props.location.state && this.props.location.state.thanks;
    this.setState({
      thanks: thanks
    })
  }

  thanksHandler() {
    this.setState({
      thanks: false
    })
  }

  render() {
    if (this.state.requestFailed) return <h2>Network Error.</h2>

    const StaticFilterToggle = withData(FilterToggle, (dataStore, props) => dataStore.getStaticFilters());

    return (
      <div className="fullscreen" key="main">
        <div className="wrapper">
          <div className="side">
            <Filter styleClass="block" />
          </div>
          <div className="main">
            <div className="intro">
              <h1>Welcome to your first week of digital media. 🚀</h1>
              <p>
                Nice to have you! This programme is your guide into the orientation days of studying digital media.
                We are happy to answer your questions here and share them with everybody.<br />
                Something urgent? Call us at <a href="tel:+4942195951304">+49 (0)421 9595-1304</a>.<br />
                Have a great start and a lot of fun!
              <br />
                <b><StaticFilterToggle /></b>
              </p>

            </div>
            <InputPlaceholder thanks={this.state.thanks} />
            <QuestionList></QuestionList>
          </div>
        </div>
      </div>
    );
  }
}

export default withSelectedFilters(withRouter(HomeView))
