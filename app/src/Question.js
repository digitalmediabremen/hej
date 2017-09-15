import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
   
  }
  
  componentDidMount() {
    fetch(this.state.data.comments_url)
      .then(response => {
        if(!response.ok) {
          throw Error("Network request failed");
        }
      
        return response;
      })
      .then(d => d.json())
      .then(d => {
        this.setState((prevState) => {
          prevState.data.answers = d;
          return prevState;
        });
      }, () => {
        this.props.requestFailedHandler();
      })
  }
  
  render() {
    if(!this.state.data.answers) return <div className="question-placeholder">...</div>
    
    
    let answerList = this.state.data.answers.map((c) => {
      return <p key={c.id} dangerouslySetInnerHTML={{__html: c.body}}></p>
    });
    
    return (
      <div>
        <h3>{this.state.data.title}</h3>
        <div>{answerList}</div>
      </div>
    );
  }
}

export default Question;