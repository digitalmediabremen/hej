import React, { Component } from 'react';
import Question from './Question.js'

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: `${this.props.apiUrl}/issues`,
      filterSettings: this.props.filterSettings
    };
   
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({filterSettings: newProps.filterSettings});
  }
  
  componentDidMount() {
    fetch(this.state.apiUrl)
      .then(response => {
        if(!response.ok) {
          throw Error("Network request failed");
        }
      
        return response;
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          data: d
        })
      }, () => {
        this.props.requestFailedHandler();
      })
  }
  
 
  
  render() {
    if(!this.state.data) return <p>loading...</p>
    let filteredQuestions = this.state.data
      .filter((question) => { 
        if(this.state.filterSettings.filters.length === 0) return true;
        return (0 <= question.labels.findIndex((label) => {
          return this.state.filterSettings.encodeFilters() === label.name;
          
        }))
      });
    if(filteredQuestions.length === 0) return <p>no questions for label "{this.state.filterSettings.encodeFilters()}" found.</p>
    
   let html = filteredQuestions.map((q) => {
      return <Question data={q} key={q.id} requestFailedHandler={this.props.requestFailedHandler}></Question>
    });
    
    return (
      <div>{html}</div>
    );
  }
}

export default Feed;
