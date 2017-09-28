import "babel-polyfill";

import React, { Component } from 'react';
import Question from './Question.js';
import {githubApiRequest, areFiltersInArray} from './Helpers.js';
import DataStore from "./DataStore.js";
import { Link } from 'react-router-dom'


class Feed extends Component {
  constructor(props) {
    super(props);
    this.dataStore = DataStore.getInstance();


    this.state = {
      selectedQuestionId: undefined,
      data: this.dataStore.getQuestions()
    }
    
    
    this.questionSelectedHandler = this.questionSelectedHandler.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  componentDidMount() {
    this.dataStore.subscribe(this.updateQuestions);
  }
  
  componentWillUnmount() {
    this.dataStore.unsubscribe(this.updateQuestions);
  }
  
    
  questionSelectedHandler(questionId) {
    this.setState({
      selectedQuestionId: questionId
    }, () => {
      let noscroll = this.state.selectedQuestionId === undefined ? false : true;
      document.body.classList.toggle('noscroll', noscroll); 
    });
  }
  
  sortQuestions(q1, q2) {
    let q1Pinned = 0 <= q1.labels.findIndex(l => l.name === "pinned") ? true : false;
    let q2Pinned = 0 <= q2.labels.findIndex(l => l.name === "pinned") ? true : false;
    
    return q1Pinned === q2Pinned ? 0 : (q1Pinned ? -1 : 1);
  } 
  
  updateQuestions() {
    this.setState({data: this.dataStore.getQuestions()})
  }
  
  
  render() {
    if(!this.state.data) return <p>loading...</p>
    

    let filteredQuestions = this.state.data
      .filter(q => areFiltersInArray(this.props.filters, q.labels));
    
    
    if(filteredQuestions.length === 0) {
      return (this.props.filters.length === 0) ? <p>no questions found.</p> : <p>no questions found for filter <span className="filter">{this.props.filters[0].name}</span></p>;
    }
    
    let html = filteredQuestions
      .sort(this.sortQuestions)
      .map(q => {
        return (
          <Question data={q} key={q.id} onQuestionSelected={this.questionSelectedHandler} selectedQuestionId={this.state.selectedQuestionId}></Question>
        )
      });
    
    return (
      <div>{html}</div>
    );
  }
}

export default Feed;
