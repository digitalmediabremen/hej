import "babel-polyfill";
import React, { Component } from 'react';
import Question from 'components/Question.js'



export default class QuestionView extends Component {

  render() {
    return (
      <div className="fullscreen" key="main">
        <Question number={this.props.match.params.number}></Question>
      </div>
    )
  }
}