import "babel-polyfill";
import React, { Component } from 'react';
import StaticFilter from "components/StaticFilter.js"


export default class InputView extends Component {

  render() {
    return (
      <div className="fullscreen" key="main">
        <div className="wrapper">
          <div className="main">
            <div className="intro big">
              <div className="gif">
              <iframe src="https://giphy.com/embed/8TFtMzqmrRkCJ7uGLg" width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
              </div>
              <br />
              <h1> Welcome to your first week of digital media. 🚀</h1>
              <p>
                Nice to have you! This programme is your guide into the orientation days of studying digital media.
                We are happy to answer your questions here and share them with everybody.<br />
                Something urgent? Call us at <a href="tel:+4942195951304">+49 (0)421 9595-1304</a>.<br />
                Have a great start and a lot of fun!
              </p>
              <br />
              <span style={{ "lineHeight": "1.5em" }}>Now choose your type of study: <StaticFilter /></span>






            </div>

          </div>
        </div>
      </div>
    )
  }
}