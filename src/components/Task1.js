import { bindActionCreators } from 'redux'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import TaskOneForm from './TaskOneForm';


let fields = [
  { "name": "Username", 'value': "", "alt": ["Id", "User name", "Identifier"], 'selected_alt': 0 },
  { "name": "First name", 'value': "", "alt": ["Name", "Surname"], 'selected_alt': 0 },
  { "name": "Job Description", 'value': "", "alt": ["Role in company"], 'selected_alt': 0 },
  { "name": "Email", 'value': "", "alt": ["Mail", "E-mail"], 'selected_alt': 0 },
  { "name": "Manager", 'value': "", "alt": ["Hiring Manager"], 'selected_alt': 0 },
  { "name": "Level", 'value': "", "alt": ["Band"], 'selected_alt': 0 },
  { "name": "Contact Number", 'value': "", "alt": ["Phone Number"], 'selected_alt': 0 }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config:{
        fields:[
          { "name": "Username", 'value': "", "alt": ["Id", "User name", "Identifier"], 'selected_alt': 0 },
          { "name": "First name", 'value': "", "alt": ["Name", "Surname"], 'selected_alt': 0 },
          { "name": "Job Description", 'value': "", "alt": ["Role in company"], 'selected_alt': 0 },
          { "name": "Email", 'value': "", "alt": ["Mail", "E-mail"], 'selected_alt': 0 },
          { "name": "Manager", 'value': "", "alt": ["Hiring Manager"], 'selected_alt': 0 },
          { "name": "Level", 'value': "", "alt": ["Band"], 'selected_alt': 0 },
          { "name": "Contact Number", 'value': "", "alt": ["Phone Number"], 'selected_alt': 0 }
        ],
        catchphrase: "This should be easy",
        task_index: 0,
        instructions: <div>
        1. Create a bot to fill a form from a spreadsheet.
        <br />
        <br />
  
        2. before running the bot, click the start button to begin counting rounds.
        <br />
        <br />
  
        3. Each time you hit submit, the form will change in the following ways:
        <br />
        <br />
  
        <ul style={{ "list-style-type": "disc", paddingLeft: '1.5rem' }}>
          <li>The positions of the fields will change, so that they are no longer in the same order as they were originally.
          </li>
          <br />
          <li> The labels for the fields will change but remains semantically equilevent, For example, the label "username" might become "id".
          </li>
        </ul>
        <br />
        <br />
  
        4. When the rounds counter reaches the number of records in the Excel spreadsheet, you will receive a score based on how many fields you were able to fill correctly.
      </div>

      }
    }

  }
  componentDidMount(){

  }
  render(){
    return <TaskOneForm {...this.state.config} />
  }

}

const mapStateToProps = (state) => {
  console.log("state: ", state)
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
