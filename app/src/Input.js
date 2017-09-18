import React, { Component } from 'react';
import Button from './Button.js'


class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
    
    this.changeHandler = this.changeHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }
  
  changeHandler(e) {
    
  }
  
  closeHandler() {
    this.setState({focused:false})
  }
  
  submitHandler() {
    console.log("frage");
  }
  
  getClassName() {
    return `input${(this.state.focused ? " selected" : "")}`;
  }
  
  focusHandler(e) {
    this.setState({
      focused: true
    })

  }
  
  
  render() { 
    return (
      <div className={this.getClassName()}>
      {this.state.focused && 
        <div>
          <h3>Ask us anything</h3>
          <textarea className="input-area" type="text"></textarea>
          <p></p>
          <Button onClose={this.closeHandler} text="cancel"></Button>
          <span onClick={this.submitHandler}> submit</span>
       </div>
      }
      {!this.state.focused && 
        <div className="input-placeholder" onClick={this.focusHandler}>
          <p>Your question goes here...</p>
        </div>
      }
      </div>
    );
  }
}

export default Input;