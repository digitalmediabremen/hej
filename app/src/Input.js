import "babel-polyfill";
import React, { Component } from 'react';
import Button from './Button.js'
import {githubApiPost} from './Helpers.js';
import { withRouter } from 'react-router-dom';



class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      sending: false,
      requestFailed: false
    };
    
    this.changeHandler = this.changeHandler.bind(this);
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
    this.props.history.push("/");
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
        this.props.history.push("/");
      
      }, () => {
        this.setState({ 
          requestFailed: true,
          sending: false,
        });

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
  
  render() { 
    return (
      <div className="input">
        <div className="wrapper">
          <h1>{this.getHeadlineText()}</h1>
          <textarea rows="5" autoFocus style={{resize: "none"}} className="input-area" placeholder="" value={this.state.input} onChange={this.changeHandler} type="text"></textarea>
          {this.checkInput() && <Button onPress={this.submitHandler} styleClass="button-send" disabled={this.getSendButtonStatus()} text={this.getSendButtonText()}></Button>}
          {!this.checkInput() && <Button onPress={this.closeHandler} disabled={this.getCancelButtonStatus()} text="back to the list"></Button>}
        </div> 
      </div>
    );
  }
}

export default withRouter(Input);

