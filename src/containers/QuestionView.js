import "babel-polyfill";
import React, { Component } from 'react';
import Question from 'components/Question.js'



export default class QuestionView extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="fullscreen fade-in" key="main">
        <Question number={this.props.match.params.number}></Question>
      </div>
    )
  }
}