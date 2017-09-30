import React, { Component } from 'react';
import DataStore from "./DataStore.js";

export default function withData(WrappedComponent, selectData) {
  
  return class extends Component {
    constructor(props) {
      super(props)
      
      this.handleChange = this.handleChange.bind(this)
      this.dataStore = DataStore.getInstance();
      
      
      this.state = {
        data: selectData(this.dataStore, this.props),
        initialLoading: true
      }
    }
    
    componentDidMount() {
      this.dataStore.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      this.dataStore.removeChangeListener(this.handleChange);
    }
    
    handleChange() {
      this.setState({
        data: selectData(this.dataStore, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }
  
}