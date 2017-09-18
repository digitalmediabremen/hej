import React, { Component } from 'react';
import TimeAgo from 'react-timeago'



class Answer extends Component {
  constructor(props) {
    super(props);
  }
  
  
  render() { 
        console.log(this.props.data);

    return (
      <div className="answer" >
        <p dangerouslySetInnerHTML={{__html: this.props.data.body}}></p>
        answered <TimeAgo date={new Date(this.props.data.updated_at)}></TimeAgo> by {this.props.data.user.login}
      </div>
    )
            
  }
}

export default Answer;