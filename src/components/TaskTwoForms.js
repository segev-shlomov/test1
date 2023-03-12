import { bindActionCreators } from 'redux'
import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import Navigation from './Navigation'
import GenerateForm from './GenerateForm';
import InstructionsAndTimer from './InstructionsAndTimer';
import { calcScoreAdvanced, userExists } from './Utils';
import TaskFinished from './TaskFinished';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'result_add': [],
      'search_result': 0,
      'result_remove': [],
      'success_rate': 0,
      'is_open': false,
      'round_index': -1,
      'search_fields': [
        { "name": "Username", 'value': "", "alt": ["Id", "User name", "Identifier"], 'selected_alt': 0 }],
      'forms_indexes': [0, 1],
      'forms': [
        {
          'name': 'add',
          'titles': props.add_titles,
          'fields': props.add_fields

        },
        {
          'name': 'remove',
          'titles': props.remove_titles,
          'fields': props.remove_fields

        }
      ]
    }
  }
  componentDidMount() {
  }
  shuffle_list(fields) {
    return fields.sort(() => Math.random() - 0.5)
  }
  reset_forms = (form_indexes, round_index) => {
    this.setState({
      'round_index': round_index,
      'search_fields': [
        { "name": "Username", "value": "", "alt": ["Id", "User name", "Identifier"], 'selected_alt': 0 }],
      'forms': [
        {
          'name': 'add',
          'titles': this.shuffle_list(this.props.add_titles),
          'fields': this.props.add_fields

        },
        {
          'name': 'remove',
          'titles': this.shuffle_list(this.props.remove_titles),
          'fields': this.props.remove_fields

        }
      ],
      forms_indexes: form_indexes,
    })
  }
  on_search = (fields) => {
    console.log("search result is", fields)
    this.setState({ search_result: userExists(fields[0].value) ? 1 : 0 })
    this.reset_forms(this.shuffle_list(this.state.forms_indexes), this.state.round_index)
  }
  add_result = (form_name, fields) => {
    let result_add = this.state.result_add
    let result_remove = this.state.result_remove
    if (form_name == "add")
      result_add.push(fields)
    if (form_name == "remove")
      result_remove.push(fields)

    this.setState({ result_add: result_add, result_remove: result_remove })
  }
  on_submit = (form_name, fields) => {
    if (this.state.round_index == 9) {
      this.add_result(form_name, fields)
      let score = calcScoreAdvanced(this.state.result_add, this.state.result_remove)
      this.setState({ round_index: - 1, success_rate: score, is_open: true, result_add: [], result_remove: [] })
    }
    else if (this.state.round_index >= 0) {
      this.add_result(form_name, fields)
      this.setState({ round_index: this.state.round_index + 1 })
    }
  }
  onStart = () => {
    if (this.state.round_index == -1) {
      this.reset_forms(this.shuffle_list(this.state.forms_indexes), 0)
    }
  }
  generateForm(form_index) {
    return <GenerateForm key={"form_" + form_index} use_label_position={this.props.use_label_position} use_placeholder={this.props.use_placeholder} on_submit={this.on_submit.bind(this, this.state.forms[form_index].name)}
      unique_key={this.props.task_id + this.state.forms[form_index].name} min_cols={2} max_cols={3} titles={this.state.forms[form_index].titles} centered_form={false} fields={this.state.forms[form_index].fields} />

  }
  render() {

    return (
      [<Navigation current_index={this.props.task_id} />,

      <div className='contentClass'>
        <InstructionsAndTimer catchphrase={this.props.catchphrase} instructions={this.props.instructions} file_link="" round_index={this.state.round_index} onStart={this.onStart} />
        <GenerateForm no_reset={true} on_submit={this.on_search} submit_label={"Search"} submit_h={true} min_cols={2} max_cols={2} title={"Search User"} centered_form={false} fields={this.state.search_fields}>
        </GenerateForm>
        <p style={{ marginBottom: '3rem' }}>{this.state.search_result} Records Found</p>
        <hr style={{ 'opacity': 0.2 }} />
        <div style={{ 'width': '88%', 'display': 'inline-block' }}>
          <div style={{ 'display': 'inline-block' }} >
            {this.state.forms_indexes[0] == 0 ? this.generateForm(0) : this.generateForm(1)}
          </div>
          <div style={{ 'float': 'right' }}>
            {this.state.forms_indexes[0] == 0 ? this.generateForm(1) : this.generateForm(0)}

          </div>
        </div>
        <TaskFinished onClose={() => { this.setState({ is_open: false }) }} success_rate={this.state.success_rate} is_open={this.state.is_open}></TaskFinished>


      </div>

      ]

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
