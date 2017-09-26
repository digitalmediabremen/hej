import "babel-polyfill";

import React, { Component } from 'react';
import Question from './Question.js';
import {githubApiRequest, areFiltersInArray} from './Helpers.js';


class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedQuestionId: window.location.hash === "#" ? undefined : parseInt( window.location.hash.substring(1))
    }
    
    this.questionSelectedHandler = this.questionSelectedHandler.bind(this);
  }

  componentDidMount() {
    var promises = [];

    githubApiRequest("issues", "?labels=public")
      .then(d => {
        d.forEach(q => {
          promises.push( 
            githubApiRequest(q.comments_url).then(a => {
              q.answers = a; 
              return q;
            })
          )
        });
        Promise.all(promises).then(d => {
          this.setState({
            data: d
          })
        }, () => {
          this.props.onRequestFailed();
        });  
      }, () => {
        this.props.onRequestFailed();
      });
  }
  
    
  questionSelectedHandler(questionId) {
    this.setState({
      selectedQuestionId: questionId
    }, () => {
         window.location.hash = (this.state.selectedQuestionId === undefined) ? "" : this.state.selectedQuestionId
    let noscroll = this.state.selectedQuestionId === undefined ? true : false;
    document.body.classList.toggle('noscroll', noscroll); 
  
    });
  }
  
  sortQuestions(q1, q2) {
    let q1Pinned = 0 <= q1.labels.findIndex(l => l.name === "pinned") ? true : false;
    let q2Pinned = 0 <= q2.labels.findIndex(l => l.name === "pinned") ? true : false;
    
    return q1Pinned === q2Pinned ? 0 : (q1Pinned ? -1 : 1);
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
        return <Question data={q} key={q.id} filters={this.props.filters} onQuestionSelected={this.questionSelectedHandler} selectedQuestionId={this.state.selectedQuestionId}></Question>
      });
    
    return (
      <div>{html}</div>
    );
  }
}

export default Feed;
