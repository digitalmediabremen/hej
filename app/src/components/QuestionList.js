import "babel-polyfill";

import React, { Component } from 'react';
import QuestionItem from 'components/QuestionItem.js';
import {areFiltersInArray} from 'utils/Helpers.js';
import withData from "utils/withData.js";

class QuestionList extends Component {
  
  sortQuestions(q1, q2) {
    let q1Pinned = 0 <= q1.labels.findIndex(l => l.name === "pinned") ? true : false;
    let q2Pinned = 0 <= q2.labels.findIndex(l => l.name === "pinned") ? true : false;
    
    return q1Pinned === q2Pinned ? 0 : (q1Pinned ? -1 : 1);
  } 
  
  render() {
    if(!this.props.data) return <p>loading...</p>
    

    let filteredQuestions = this.props.data
      .filter(q => areFiltersInArray(this.props.filters, q.labels));
    
    
    if(filteredQuestions.length === 0) {
      return (this.props.filters.length === 0) ? <p>no questions found.</p> : <p>no questions found for filter <span className="filter">{this.props.filters[0].name}</span></p>;
    }
    
    let html = filteredQuestions
      .sort(this.sortQuestions)
      .map(q => {
        return (
          <QuestionItem number={q.number} key={q.id}></QuestionItem>
        )
      });
    
    return (
      <div>{html}</div>
    );
  }
}

export default withData(QuestionList, (DataStore, props) => DataStore.getQuestions());
