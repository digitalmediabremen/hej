import "babel-polyfill";

import React, { Component } from 'react';


class Button extends Component {
  static get defaultProps() {
    return {
      disabled: false,
      color: "#ddd",
      styleClass: ""
    }
  }

  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  
  clickHandler(e) {
    if(this.props.disabled) return;
    this.props.onPress();
  }
  
  getClassName() {
    return `button${this.props.disabled ? " disabled" : ""}`;
  }
  
  render() {   
    return (
      <span className={this.getClassName() + " " + this.props.styleClass} onClick={this.clickHandler}>
        {this.props.text}
      </span>
    )
  }
}

export default Button;