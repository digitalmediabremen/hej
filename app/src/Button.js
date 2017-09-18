import React, { Component } from 'react';


class Button extends Component {
  constructor(props) {
    super(props);
    
    this.closeHandler = this.closeHandler.bind(this);
  }
  
  closeHandler(e) {
    this.props.onClose();
  }
  
  
  render() {   
    return (
      <span className="close" onClick={this.closeHandler}>
        {this.props.text}
      </span>
    )
  }
}

export default Button;