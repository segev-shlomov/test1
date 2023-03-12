import './App.scss';
import { bindActionCreators } from 'redux'
import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import CanSay from './components/CanSay'
import JustSaid from './components/JustSaid'
import ProgramRepresentation from './components/ProgramRepresentation'
import BotImage from './components/BotImage';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Navigation from './components/Navigation';





class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'added_file': null,
      'selectedIndex': 0
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      [<Navigation />, "No Task selected"]
    )
  }
}
const mapStateToProps = (state) => {
  console.log("state: ", state)
  return {
    ...state,
    played_data: state.mqttReducer.played_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
