import React, { Component } from 'react';
import Input from "../components/Input.js"


export default class InputView extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return       <div className="fullscreen input fade-in">
    <Input></Input>
    </div>
  } 
}