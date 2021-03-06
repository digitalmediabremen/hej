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
    e.preventDefault();
    if(this.props.disabled) return;
    this.props.onPress();
  }
  
  getClassName() {
    return `button${this.props.disabled ? " disabled" : ""}`;
  }
  
  render() {   
    return (
      <a href="#" className={this.getClassName() + " " + this.props.styleClass} onClick={this.clickHandler}>
        {this.props.text}
      </a>
    )
  }
}

export default Button;