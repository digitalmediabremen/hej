import "babel-polyfill";
import React, { Component } from 'react';
import Button from './Button.js'
import {githubApiPost} from './Helpers.js';
import DataStore from "./DataStore.js";
import Question from './Question.js'



export default class SingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.dataStore = DataStore.getInstance();
    this.state = {
      data: this.dataStore.getQuestion(this.props.match.params.number)
    }
    this.updateQuestion = this.updateQuestion.bind(this);
  }
  
    
  componentDidMount() {
    this.dataStore.subscribe(this.updateQuestion);
  }
  
  componentWillUnmount() {
    this.dataStore.unsubscribe(this.updateQuestion);
  }
  
  updateQuestion() {
    this.setState({data: this.dataStore.getQuestion(this.props.match.params.number)});
    console.log(this.state);
  }
  
  render() {
    if(this.state.data !== undefined) return <Question data={this.state.data} selectedQuestionId={parseInt(this.props.match.params.number)}></Question>
    return         <div className="wrapper"><p>loading...</p></div>
  }
  
  
}