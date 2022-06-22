import React, { Component } from 'react';
import QuestionList from '../components/QuestionList.js';
import Filter from '../components/Filter.js';
import InputPlaceholder from '../components/InputPlaceholder.js';
import { withRouter, Link } from 'react-router-dom';
import withSelectedFilters from "../utils/withSelectedFilters.js";
import FilterToggle from "../components/FilterToggle.js"
import withData from "../utils/withData.js";
import Disclaimer from "../components/Disclaimer";
import Header from "../components/Header";



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

    return (
      <div className="fullscreen" key="main">
        <div className="wrapper">
          <div className="side">
            <Filter styleClass="block" />
          </div>
          <div className="main">
            <Header />
            <InputPlaceholder thanks={this.state.thanks} />
            <QuestionList></QuestionList>
          </div>
        </div>
        <Disclaimer />
      </div>
    );
  }
}

export default withSelectedFilters(withRouter(HomeView))
