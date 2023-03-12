import { bindActionCreators } from 'redux'
import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import Navigation from './Navigation'
import { users ,calcScore} from './Utils';
import GenerateForm from './GenerateForm';
import InstructionsAndTimer from './InstructionsAndTimer';
import TaskFinished from './TaskFinished';

class TaskOneForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'success_rate': 0,
      'is_open': false,
      'result': [],
      'round_index': -1,
      'fields': props.fields
    }
  }
  onStart = () => {
    if (this.state.round_index == -1) {
      this.setState({ round_index: 0, fields: this.props.fields })
    }
  }
  computeScore = () => {
    let score = calcScore(this.state.result)
    console.log("Returned score is", score)
    console.log("results", this.state.result)
    // console.log("Users are", users);
    this.setState({ result: [], success_rate: score, is_open: true })
  }
  on_submit = (fields) => {
    if (this.state.round_index != -1) {
      let result = this.state.result;
      result.push(fields);
      this.setState({ result: result })
    }
    if (this.state.round_index == 9) {
      this.setState({ round_index: - 1 })
      this.computeScore()
    }
    else if (this.state.round_index >= 0) {
      this.setState({ round_index: this.state.round_index + 1 })
    }
  }
  render() {
    return (
      [<Navigation current_index={this.props.task_index} />,
      <div className='contentClass'>
        <InstructionsAndTimer catchphrase={this.props.catchphrase} instructions={this.props.instructions} file_link="" round_index={this.state.round_index} onStart={this.onStart} />
        <br />
        <GenerateForm use_label_position={this.props.use_label_position} use_placeholder={this.props.use_placeholder} on_submit={this.on_submit} unique_key={"task_" + this.props.task_index} centered_form={true} fields={this.state.fields} />
        <TaskFinished onClose={() => { this.setState({ is_open: false }) }} success_rate={this.state.success_rate} is_open={this.state.is_open}></TaskFinished>
      </div>
      ]

    )
  }

}
const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskOneForm)
