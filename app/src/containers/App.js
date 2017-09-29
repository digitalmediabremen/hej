import React from 'react';
import HomeView from 'containers/HomeView.js'
import InputView from 'containers/InputView.js'
import QuestionView from 'containers/QuestionView.js'
import { Switch, Route, BrowserRouter } from "react-router-dom"
import "./App.css"


const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomeView}/>
        <Route path='/ask' component={InputView}/>
        <Route path='/:number' component={QuestionView}/>
      </Switch>
    </div>
  </BrowserRouter>

)

export default App;