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

import {
    ToggletipButton,
    ToggletipLabel,
    ToggletipContent,
    Toggletip,
    ToggletipActions,

    Button,
} from '@carbon/react';
import GenerateForm from './GenerateForm';





class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": [['First name',
            'Username',
            'Contact Number',
            'Manager',
            'Email',
            'Job Description',
            'Level',
            'Reason'],
        ['Samantha',
            'Samantha_Sunflower',
            '(555) 555-0123',
            'John Smith',
            'SamanthaSmith@test.com',
            'Software Engineer',
            5,
            'Poor performance'],
        ['Benjamin',
            'Benjamin_Bear',
            '(555) 555-4567',
            'Jessica Williams',
            'BenjaminWilliams@test.com',
            'Data Scientist',
            6,
            null],
        ['Emily',
            'Emily_Butterfly',
            '(555) 555-8901',
            'David Brown',
            'EmilyBrown@test.com',
            'Technical Project Manager',
            7,
            'Misconduct'],
        ['Michael',
            'Michael_Mountain',
            '(555) 555-8102',
            'Sarah Johnson',
            'MichaelJohnson@test.com',
            'DevOps Engineer',
            8,
            null],
        ['Olivia',
            'Olivia_Ocean',
            '(555) 555-8903',
            'Michael Davis',
            'OliviaDavis@test.com',
            'Security Engineer',
            9,
            'Detrimental behavior'],
        ['Ethan',
            'Ethan_Eagle',
            '(555) 555-9904',
            'Rachel Anderson',
            'EthanAnderson@test.com',
            'Technical Writer',
            10,
            null],
        ['Sophia',
            'Sophia_Sunshine',
            '(555) 555-0905',
            'Robert Garcia',
            'SophiaGarcia@test.com',
            'Quality Assurance Engineer',
            11,
            'Position no longer necessary'],
        ['David',
            'David_Dragon',
            '(555) 555-8106',
            'Lisa Martin',
            'DavidMartin@test.com',
            'Front-End Developer',
            12,
            null],
        ['Abigail',
            'Abigail_Apple',
            '(555) 555-8007',
            'Thomas Rodriguez',
            'AbigailRodriguez@test.com',
            'Network Engineer',
            13,
            null],
        ['Alexander',
            'Alexander_Asteroid',
            '(555) 555-8208',
            'Jennifer Thompson',
            'AlexanderThompson@test.com',
            'Cloud Architect',
            14,
            'Violation of company policies']],
            "csv_data": null
        }
    }
    componentDidMount() {
        let data = this.state.data;
        var csv = data[0].join(",") + '\n';
        data.shift()
        data.forEach(function (row) {
            // if(row.includes("Username"))
            //     continue;
            csv += row.join(',');
            csv += "\n";
        });
        this.setState({ "csv_data": csv })
        
    }
    Geninstructions = (instructions, file_link) => {
        return ([
            <div style={{ display: 'flex' }}>
                <ToggletipLabel className="instructions-text bold-text">Task Explained</ToggletipLabel>
                <Toggletip >
                    <ToggletipButton size="md" label="Show information">
                        <Information />
                    </ToggletipButton>
                    <ToggletipContent >
                        {instructions}
                        <ToggletipActions>
                            {/* <Link href="#">Download Excel</Link> */}
                            <Button download='users.csv' href={'data:text/csv;charset=utf-8,' + encodeURI(this.state.csv_data)} target='_blank' size="sm">Download CSV File</Button>
                        </ToggletipActions>
                    </ToggletipContent>
                </Toggletip>

            </div>,
            <div style={{ "marginTop": "1rem" }}>


                <Button onClick={(e) => {
                    // e.preventDefault()
                    this.props.onStart()
                }
                } renderIcon={Timer} style={{}} size="md">{this.props.round_index == -1 ? "Start" : "Round " + (this.props.round_index + 1)}</Button>

            </div>]
        );
    }

    render() {
        return (

            <div className='task-welcome-box'>
                <p style={{ 'fontSize': '1.4rem', 'fontWeight': 'bolder' }}>Welcome to Intelligent Process Automation Challenge</p>

                <p>{this.props.catchphrase && <span>{this.props.catchphrase}, </span>}Can you create a bot to to perform this task, and be on top of the Leaderboards? <br />Are you up to the challenge?</p>
                <div className='task-instructions-box'>

                    {this.Geninstructions(this.props.instructions, this.props.file_link)}

                </div>
            </div>
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
