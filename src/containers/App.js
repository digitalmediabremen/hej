import React, { Component } from 'react';

import HomeView from './HomeView.js'
import InputView from './InputView.js'
import PreSelectionView from './PreSelectionView.js'
import QuestionView from './QuestionView.js'
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import "./App.css"
import withSelectedFilters from "../utils/withSelectedFilters.js";



class App extends Component {

  render() {
    return (
      <BrowserRouter onUpdate={() => { window.scrollTo(0, 0); console.log("sdsd"); }}>
        <div className="App">
          <Switch>
            {this.props.getSelectedStaticFilter() == undefined &&
              <Route path="/" component={PreSelectionView} />
            }
            <Route exact path='/' component={HomeView} />
            <Route path='/ask' component={InputView} />
            {/* <Route path='/thanks' render={(props) => <HomeView {...props} thanks={true} />} /> */}
            <Route path='/thanks'>
              <Redirect
                to={{
                  pathname: "/",
                  state: { thanks: true }
                }}
              />
            </Route>
            <Route path='/:number' component={QuestionView} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default withSelectedFilters(App);