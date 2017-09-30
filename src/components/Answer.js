import "babel-polyfill";

import React, { Component } from 'react';
import TimeAgo from 'react-timeago'



class Answer extends Component {  
  render() { 

    return (
      <div className="answer">
        <div dangerouslySetInnerHTML={{__html: this.props.data.body_html}}></div>
        <span className="answer-date"><TimeAgo date={new Date(this.props.data.updated_at)}></TimeAgo></span>

      </div>
    )
            
  }
}

export default Answer;