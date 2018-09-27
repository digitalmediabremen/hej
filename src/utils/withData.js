import React, { Component } from 'react';
import DataStore from "./DataStore.js";

export default function withData(WrappedComponent, selectData) {
  
  return class extends Component {
    constructor(props) {
      super(props)
      
      this.handleChange = this.handleChange.bind(this)
      this.dataStore = DataStore.getInstance();
      
      
      try {
        this.state = {
          data: selectData(this.dataStore, this.props),
          notFound: false
        } 
      } catch(err) {
        console.error(err)
        this.state = {
          data: undefined,
          notFound: true
        }
      }
    }
    
    componentDidMount() {
      this.dataStore.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      this.dataStore.removeChangeListener(this.handleChange);
    }
    
    handleChange() {
      try {
        this.setState({
          data: selectData(this.dataStore, this.props),
          notFound: false
        });
      } catch(err) {
        console.error(err.message)
        this.setState({
          data: undefined,
          notFound: true
        })
      }
      
    }

    render() {
      return <WrappedComponent data={this.state.data} notFound={this.state.notFound} {...this.props} />;
    }
  }
  
}