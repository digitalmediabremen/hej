import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';



class InputPlaceholder extends Component {
  constructor(props) {
    super(props);

    this.focusHandler = this.focusHandler.bind(this);
    this.placeholders = [
      "Can a person be motivated by desires that are not–ultimately–selfish?",
      "Why, if two wrongs don't make a right, do two negatives make a positive in mathematics?",
      "Does thought require language?",
      "Who closes the bus door once the bus driver gets off?",
      "Why is there a \"d\" in \"fridge\" but not in \"refrigerator\"?",
      "If you drop soap on the floor is the floor clean or the soap dirty?",
      "Would Lightning McQueen buy car insurance or life insurance?",
      "Who put the alphabet in alphabetical order?",
      "Is there a synonym for \"synonym\"?",
      "If your shirt isn't tucked into your pants, are your pants tucked into your shirt?",
      "Why is it called \"quick sand\" if you sink slowly in it?",
      "If I try to fail, but succeed, which one did I do?",
      "What would there be if there was nothing?",
      "How the hell should I spell your name?",
      "How can the time move faster?",
      "Can we calculate the universe?",
      "What is the real difference between a utopia and a dystopia?",
      "Is this sentence is incorrect?",

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
        <p>We will soon answer, and post it here (Titles may change). Click to ask another.</p>
      </div> :
      <div className="input-placeholder" onClick={this.focusHandler}>
        <h2>{this.pickPlaceHolder()}</h2>
        <p>Ask anything. In English or German. We will answer here. For more specific or urgent questions, visit our Discord.</p>
      </div>
    return html;
  }
}

export default withRouter(InputPlaceholder)