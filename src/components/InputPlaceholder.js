import "babel-polyfill";
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';



class InputPlaceholder extends Component {
  constructor(props) {
    super(props);

    this.focusHandler = this.focusHandler.bind(this);
    this.placeholders = [
      "How should I name things?",
      "Can a person be motivated by desires that are not–ultimately–selfish?",
      "What is the relationship between beauty and truth?",
      "Why, if two wrongs don't make a right, do two negatives make a positive in mathematics?",
      "Does thought require language?"
    ]
  }

  focusHandler(e) {
    this.props.history.push("/ask");
  }

  pickPlaceHolder() {
    let r = Math.floor(Math.random() * (this.placeholders.length));
    return this.placeholders[r];
  }


  render() {
    const html = this.props.thanks ?
      <div className="input-placeholder thanks" onClick={this.focusHandler}>
        <h2>Thanks for handing in your question! 👏👏👏</h2>
        <p>We will soon answer, and post it here. Click to ask another.</p>
      </div> :
      <div className="input-placeholder" onClick={this.focusHandler}>
        <h2>{this.pickPlaceHolder()}</h2>
        <p>Ask us anything. Ask in german or english.</p>
      </div>
    return html;
  }
}

export default withRouter(InputPlaceholder)