import "babel-polyfill";

import React, { Component } from 'react';
import Answer from './Answer.js';
import Button from './Button.js'
import TimeAgo from 'react-timeago'
import {isFilterNameInArray} from './Helpers.js';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';



class Question extends Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);

  }

  clickHandler(e) {
    if(!this.hasAnswers() || this.isSelected()) return;
    //this.props.onQuestionSelected(this.props.data.number);
    this.props.history.push("/" + this.props.data.number);
  }
  
  isSelected() {
    return this.props.selectedQuestionId === this.props.data.number;
  }
  
  isPinned() {
    return isFilterNameInArray(this.props.data.labels, "pinned");
  }
  
  closeHandler() {
    this.props.history.push("/");

    //return this.props.onQuestionSelected(undefined);
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
    var styleClass = "question"
    if(this.hasAnswers()) styleClass += " has-answers" 
    if(this.isSelected()) styleClass += " selected" 
    if(this.isPinned()) styleClass += " pinned"
  
    return styleClass
  }
  
  getTitle() {
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
          {(this.isSelected()) && <Button text="back to the list" onPress={this.closeHandler}></Button>}  
        </div>
      </div>
    )
    
    return (
      <div className={this.getClassName()}>
        {this.props.data.title !== "" && <h2 onClick={this.clickHandler} className="question-title de">{this.getTitle()}</h2>} 
        {(!this.isSelected() && this.hasAnswers()) && <span className="answer-date">answered <TimeAgo date={new Date(this.getNewestAnswer().updated_at)}></TimeAgo></span>}
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

export default withRouter(Question);