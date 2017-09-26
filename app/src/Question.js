import "babel-polyfill";

import React, { Component } from 'react';
import Answer from './Answer.js';
import Button from './Button.js'
import TimeAgo from 'react-timeago'




class Question extends Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }
  
  clickHandler(e) {
    if(!this.hasAnswers() || this.isSelected()) return;
    this.props.onQuestionSelected(this.props.data.id);
  }
  
  isSelected() {
    return this.props.selectedQuestionId === this.props.data.id;
  }
  
  closeHandler() {
    return this.props.onQuestionSelected(undefined);
  }
  
  hasAnswers() {
    return this.props.data.answers.length !== 0;
  }
  
  getNewestAnswer() {
    if(!this.hasAnswers()) return undefined;
    let a = this.props.data.answers;
    return a[a.length - 1]
  }
  
  getClassName() {
    return `question${this.hasAnswers() ? " has-answers" : ""}${this.isSelected() ? " selected" : ""}`
  }
  
  getTitle() {
    if(!this.hasAnswers()) return `++ ${this.props.data.title}`
    return this.props.data.title;
  }
  
  render() {

    let answerList = this.props.data.answers.map((c) => {
      return <Answer key={c.id} data={c}></Answer>
    });
    
    if(this.isSelected()) return(
      <div className={this.getClassName()}>
        <div className="wrapper">
          {this.props.data.title !== "" && <h2 onClick={this.clickHandler} className="question-title de">{this.getTitle()}</h2>}
          {(!this.isSelected() && this.hasAnswers()) && <span className="answer-date">answered <TimeAgo date={new Date(this.getNewestAnswer().updated_at)}></TimeAgo></span>}
          {(this.isSelected()) && <div className="answer-list">{answerList}</div>}
          {(this.isSelected()) && <Button onPress={this.closeHandler} text="back to the list"></Button>}  
        </div>
      </div>
    )
    
    return (
      <div className={this.getClassName()}>
        {this.props.data.title !== "" && <h2 onClick={this.clickHandler} className="question-title de">{this.getTitle()}</h2>}             
      </div>
    );
        
//    return (
//      <div className={this.getClassName()}>
//        {this.props.data.title !== "" && <h2 onClick={this.clickHandler} className="question-title de">{this.props.data.title}</h2>}
//        {this.props.data.body !== "" && <h2 onClick={this.clickHandler} className="question-title en">{this.props.data.body}</h2>}
//        {(this.isSelected()) && <div className="answer-list">{answerList}</div>}
//        {(this.isSelected()) && <Button onPress={this.closeHandler} text="back to the list"></Button>}              
//      </div>
//    );
  }
}

export default Question;