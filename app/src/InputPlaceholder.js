import "babel-polyfill";
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';



class InputPlaceholder extends Component {
  constructor(props) {
    super(props);
    
    this.focusHandler = this.focusHandler.bind(this);
  }
  
  focusHandler(e) {
    this.props.history.push("/ask");
  }
  
  
  render() { 
    return (
      <div className="input-placeholder" onClick={this.focusHandler}>
        <h2>Why is the universe so large?</h2>
        <p>Ask us anything. Ask in german or english.</p>
      </div>
    );
  }
}

export default withRouter(InputPlaceholder)