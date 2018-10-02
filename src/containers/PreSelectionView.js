import "babel-polyfill";
import React, { Component } from 'react';
import StaticFilter from "components/StaticFilter.js"
import Typed from 'react-typed';
import DataStore from "utils/DataStore"


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
              <h1 className="">
              Hej, <Typed 
                    strings={DataStore.studentNames} 
                    typeSpeed={80} 
                    shuffle={true}
              />.</h1>
              <p>
                Welcome to Digital Media at HfK + University Bremen. 🚀 <br />
                You have made it! We have prepared this cybernetic place and a busy first week for you.
                This website will help you getting started. We will keep you posted all week long.
                Check the <a target="_blank" href="http://digitalmedia-bremen.de/owoche-2018/">programme website</a> 
                for your invitation to this week and details for <a target="_blank" href="http://digitalmedia-bremen.de/profile/bachelor/program-structure/">Bachelor</a> 
                and <a target="_blank" href="http://digitalmedia-bremen.de/profile/master/program-structure/">Master</a> later on.
                We are looking forward to meet you in person. See you Monday!
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