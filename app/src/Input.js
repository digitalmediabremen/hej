import "babel-polyfill";

import React, { Component } from 'react';
import Button from './Button.js'
import {githubApiPost} from './Helpers.js';



class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      input: "",
      sending: false,
      requestFailed: false
    };
    
    this.changeHandler = this.changeHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  changeHandler(e) {
    console.log(e.target.scrollHeight);
    this.setState({ input: e.target.value });
  }
  
  closeHandler() {
    this.setState({
      focused:false,
      sending:false,
      requestFailed: false,
      input: ""
    })
  }
  
  submitHandler() {
    if(!this.checkInput()) return;
    
    this.setState({
      requestFailed: false,
      sending: true 
    })
    
    githubApiPost("issues", {title: this.state.input})
    .then(d => {
        this.setState({
          input: "",
          focused: false,
          sending: false
        })
      
      }, () => {
        this.setState({ 
          requestFailed: true,
          sending: false,
        }) 
      });
  }
  
  getSendButtonText() {
    if(this.state.requestFailed) return "resend?"
    if(this.state.sending) return "sending..."
    else return "send"
  }
  
  
  
  getHeadlineText() {
    if(this.state.requestFailed) return "Your message could not been sent."
    if(this.state.sending) return "Thanks for your answer!"
    else return "Ask us anything."
  }
  
  checkInput() {
    return this.state.input.length > 5;
  }
  
  getSendButtonStatus() {
    return !this.checkInput() || this.state.sending;
  }
  
  getCancelButtonStatus() {
    return this.state.sending;
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
        <div className="wrapper">
          <h1>{this.getHeadlineText()}</h1>
          <textarea rows="5" autoFocus style={{resize: "none"}} className="input-area" placeholder="" value={this.state.input} onChange={this.changeHandler} type="text"></textarea>
          <Button onPress={this.submitHandler} styleClass="button-send" disabled={this.getSendButtonStatus()} text={this.getSendButtonText()}></Button>
          <Button onPress={this.closeHandler} disabled={this.getCancelButtonStatus()} text="clear and back to the list"></Button>

       </div>
      }
      {!this.state.focused && 
        <div className="input-placeholder" onClick={this.focusHandler}>
          <h2>Why is the universe so large?</h2>
          <p>Ask us anything. Ask in german or english.</p>
        </div>
      }
      </div>
    );
  }
}

export default Input;