import React, { Component } from 'react';
import StaticFilter from "../components/StaticFilter.js"
import Typed from 'react-typed';
import DataStore from "../utils/DataStore"


export default class InputView extends Component {

  render() {
    return (
      <div className="fullscreen" key="main">
        <div className="wrapper">
          <div className="main">
            <div className="intro big">
              <div className="gif">
                <iframe src="/media/giphy.gif"  width="100%" height="100%" frameBorder="0"></iframe>
              </div>
              <br />
              <h1 className="">
              Hej, <Typed 
                    strings={DataStore.studentNames} 
                    typeSpeed={80} 
                    shuffle={true}
                    loop={true}
              />.</h1>
              <p>
                Hej! This is the main hub for the Digital Media Orientation Week.
              </p>
              <br />
              <span style={{ "lineHeight": "1.5em" }}>The internet gods blessed us with this website for Digital Media Studies, so choose your track: <StaticFilter /></span>






            </div>

          </div>
        </div>
      </div>
    )
  }
}
