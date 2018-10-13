import "babel-polyfill";

import React, { Component } from 'react';
import QuestionList from 'components/QuestionList.js';
import Filter from 'components/Filter.js';
import InputPlaceholder from 'components/InputPlaceholder.js';
import { withRouter, Link } from 'react-router-dom';
import withSelectedFilters from "utils/withSelectedFilters.js";
import FilterToggle from "components/FilterToggle.js"
import withData from "utils/withData.js";
import Typed from 'react-typed';
import DataStore from "utils/DataStore"



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
              <h1 className="">
              Hej, <Typed 
                    strings={DataStore.studentNames} 
                    typeSpeed={80} 
                    shuffle={true}
                    loop={true}
              />.</h1>
              <p className="small">
                It was nice to spend the first week with you. We will continue to update this website here for a few more weeks, as a good referance to get you going. 
                Feel free to ask questions here or in person. <br/><br/>Please share your feedback and comments to <a href="mailto:hej@digitalmedia-bremen.de">hej@digitalmedia-bremen.de</a>.
                Also reach out if you missed the introduction week, we can help.
                <br />
                <StaticFilterToggle />
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
