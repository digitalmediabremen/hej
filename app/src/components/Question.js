import "babel-polyfill";

import React, { Component } from 'react';
import Answer from 'components/Answer.js';
import Button from 'components/Button.js'
import {isFilterNameInArray} from 'utils/Helpers.js';
import { withRouter } from 'react-router-dom';
import withData from 'utils/withData.js'



class Question extends Component {
  constructor(props) {
    super(props);
    
    this.closeHandler = this.closeHandler.bind(this);

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
    var styleClass = "question full"
    if(this.hasAnswers()) styleClass += " has-answers" 
    if(this.isPinned()) styleClass += " pinned"
  
    return styleClass
  }
  
  getTitle() {
    return this.props.data.title;
  }
  
  render() {
    if(!this.props.data) return <div className="wrapper"><p>loading...</p></div>;

    let answerList = this.props.data.answers.map((c) => {
      return <Answer key={c.id} data={c}></Answer>
    });
    
    return(
      <div className="wrapper">

      <div className={this.getClassName()}>
          <h2 className="question-title de">{this.getTitle()}</h2>
          {(this.hasAnswers()) && <div className="answer-list">{answerList}</div>}
          <Button text="back to the list" onPress={this.closeHandler}></Button>
      </div>
        
                </div>

    )
  }
}

export default withRouter(withData(Question, (DataStore, props) => DataStore.getQuestion(props.number)));