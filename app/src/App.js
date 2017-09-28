import React, { Component } from 'react';
import Main from './Main.js'
import Input from './Input.js'
import SingleQuestion from './SingleQuestion.js'
import { Switch, Route, BrowserRouter } from "react-router-dom"


const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/ask' component={Input}/>
        <Route path='/:number' component={SingleQuestion}/>
      </Switch>
    </div>
  </BrowserRouter>

)

export default App;