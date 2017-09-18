import React, { Component } from 'react';
import Answer from './Answer.js';
import Button from './Button.js'



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
  
  getClassName() {
    return `question${this.hasAnswers() ? " question-has-answers" : ""}${this.isSelected() ? " selected" : ""}`
  }
  
  render() {

    let answerList = this.props.data.answers.map((c) => {
      return <Answer key={c.id} data={c}></Answer>
    });
        
    return (
      <div className={this.getClassName()}>
        {this.props.data.title !== "" && <h2 onClick={this.clickHandler} className="question-title de">{this.props.data.title}</h2>}
        {this.props.data.body !== "" && <h2 onClick={this.clickHandler} className="question-title en">{this.props.data.body}</h2>}
        {(this.isSelected()) && <div className="answer-list">{answerList}</div>}
        {(this.isSelected()) && <Button onClose={this.closeHandler} text="back to the list"></Button>}              
      </div>
    );
  }
}

export default Question;