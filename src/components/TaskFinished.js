import { bindActionCreators } from 'redux'
import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import Navigation from './Navigation'
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

import { Information, NumberSmall_1, Time, Timer } from '@carbon/icons-react'

import {users} from './Utils'
import { Modal } from '@carbon/react';







class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {

    }
    render() {
        return (

                <Modal
                  open = {this.props.is_open}
                  modalHeading="Congratulations!"
                  onRequestClose = {this.props.onClose}
                  onRequestSubmit = {this.props.onClose}
                  onSecondarySubmit = {this.props.onClose}
                  primaryButtonText="Ok"
                //   secondaryButtonText="Reset"
                  >
                  <p style={{ marginBottom: '1rem' }}>
                        Your success rate is {this.props.success_rate + "%"} in 5 seconds
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                       To submit your result to the leaderboards, fill out the <a>leader boards request form</a>
                  </p>
                  </Modal>
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
