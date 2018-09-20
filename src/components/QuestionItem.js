import "babel-polyfill";

import React, { Component } from 'react';
import TimeAgo from 'react-timeago'
import {isFilterNameInArray} from 'utils/Helpers.js';
import { withRouter } from 'react-router-dom';
import withData from 'utils/withData.js'
import FilterList from "components/FilterList.js";
import DataStore from "utils/DataStore.js";




class QuestionItem extends Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);

  }

  clickHandler(e) {
    if(!this.hasAnswers()) return;
    //this.props.onQuestionSelected(this.props.data.number);
    this.props.history.push("/" + this.props.data.number);
  }

  isPinned() {
    return isFilterNameInArray(this.props.data.labels, "pinned");
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
    var styleClass = "question list-item"
    if(this.hasAnswers()) styleClass += " has-answers" 
    if(this.isPinned()) styleClass += " pinned"
  
    return styleClass
  }
  
  getTitle() {
    return this.props.data.title;
  }
  
  render() {
    if(!this.props.data) return <p>loading...</p>
    let labels = this.props.data.labels;
    let exclude = DataStore.excludedLabels.concat(DataStore.staticLabels)
    let filteredLabels =  labels.filter(filter => !exclude.includes(filter.name));
    let FilterListWithData = withData(FilterList,(DataStore, props) => filteredLabels);
    console.log(this.props)
   
    return (
      <div className={this.getClassName()}>
        {this.props.data.title !== "" && <h2 onClick={this.clickHandler} className="question-title de">{this.getTitle()}</h2>} 
        {this.hasAnswers() && <span className="answer-date">answered <TimeAgo date={new Date(this.getNewestAnswer().updated_at)}></TimeAgo></span>}
        <FilterListWithData />
      </div>
    );
      
  }
}

export default withRouter(withData(QuestionItem, (DataStore, props) => DataStore.getQuestion(props.number)));