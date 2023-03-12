import { bindActionCreators } from 'redux'
import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import TaskTwoForms from './TaskTwoForms';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            config: {
                add_titles: ["Add User", "New User", "Insert User"],
                add_fields: [
                    { "name": "Username", 'value': "", "alt": ["Id", "User name", "Identifier"], 'selected_alt': 0, 'is_placeholder': false, 'label_position': 'up' },
                    { "name": "First name", 'value': "", "alt": ["Name", "Surname"], 'selected_alt': 0, 'is_placeholder': true, 'label_position': 'down' },
                    { "name": "Job Description", 'value': "", "alt": ["Role in company"], 'selected_alt': 0, 'is_placeholder': false, 'label_position': 'up' },
                    { "name": "Email", 'value': "", "alt": ["Mail", "E-mail"], 'selected_alt': 0, 'is_placeholder': true, 'label_position': 'down' },
                    { "name": "Manager", 'value': "", "alt": ["Hiring Manager"], 'selected_alt': 0, 'is_placeholder': false, 'label_position': 'down' },
                    { "name": "Level", 'value': "", "alt": ["Band"], 'selected_alt': 0, 'is_placeholder': true, 'label_position': 'up' },
                    { "name": "Contact Number", 'value': "", "alt": ["Phone Number"], 'selected_alt': 0, 'is_placeholder': false, 'label_position': 'up' }
                ],
                remove_titles: ["Remove User", "Delete User"],
                remove_fields: [
                    { "name": "Username", 'value': "", "alt": ["Id", "User name", "Identifier"], 'selected_alt': 0, 'is_placeholder': false, 'label_position': 'up' },
                    { "name": "First name", 'value': "", "alt": ["Name", "Surname"], 'selected_alt': 0, 'is_placeholder': true, 'label_position': 'down' },
                    { "name": "Job Description", 'value': "", "alt": ["Role in company"], 'selected_alt': 0, 'is_placeholder': false, 'label_position': 'up' },
                    { "name": "Email", 'value': "", "alt": ["Mail", "E-mail"], 'selected_alt': 0, 'is_placeholder': true, 'label_position': 'down' },
                    { "name": "Manager", 'value': "", "alt": ["Hiring Manager"], 'selected_alt': 0, 'is_placeholder': false, 'label_position': 'down' },
                    { "name": "Level", 'value': "", "alt": ["Band"], 'selected_alt': 0, 'is_placeholder': true, 'label_position': 'up' },
                    { "name": "Contact Number", 'value': "", "alt": ["Phone Number"], 'selected_alt': 0, 'is_placeholder': false, 'label_position': 'up' }
                ],
                catchphrase: "Good luck with this one",
                task_id: 2,
                use_placeholder: true,
                use_label_position: true,
                instructions: <div>
                    1. Click the start button to start counting rounds.

                    <br />
                    <br />
                    2. Create a bot to search for a user by their username in a spreadsheet.
                    <br />
                    <br />

                    3. If the search result indicates that the user exists in the system, the bot must fill out the "add" form.
                    <br />
                    <br />

                    4. If the search result indicates that the user does not exist in system, the bot must fill out the "remove" form.


                    5. Each time you hit submit ethier on 'add' form or 'remove' form, the forms will change in the following ways:
                    <br />
                    <br />

                    <ul style={{ "list-style-type": "disc", paddingLeft: '1.5rem' }}>
                        <li style={{ fontWeight: 'bold' }}>The positions of 'add' form and 'remove' form will alternate randomly
                        </li>
                        <br />

                        <li style={{ fontWeight: 'bold' }}> The title of the forms will change but remains semantically equilevent, For example, the title "Add User" might become "New User".
                        </li>
                        <br />

                        <li>The positions of the fields will change, so that they are no longer in the same order as they were originally.
                        </li>
                        <br />

                        <li> The labels for the fields will change but remains semantically equilevent, For example, the label "username" might become "id".
                        </li>
                        <br />
                        <li> The label will be positioned in three different ways: on top of the field, on the bottom of the field, or inside the field as a placeholder.
                        </li>
                    </ul>
                    <br />
                    <br />

                    6. When the rounds counter reaches the number of records in the Excel spreadsheet, you will receive a score based on how many fields you were able to fill correctly.

                </div>

            }

        }
    }
    render() {
       return <TaskTwoForms {...this.state.config}/>
    }

}
const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({}, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
