import { bindActionCreators } from 'redux'
import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import Navigation from './Navigation'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import { Information } from '@carbon/icons-react'

import {
  Tile,
  Tab,
  Tabs,
  Table,
  TextInput,
  ToggletipButton,
  HeaderMenuItem,
  TableHead,
  TableRow,
  ToggletipLabel,
  ToggletipContent,
  Toggletip,
  ToggletipActions,

  TableCell,

  TableBody,

  TableHeader,

  FormLabel,
  Form,
  Stack,
  FormGroup,
  TabList,
  Checkbox,
  FormItem,
  TabPanel,
  TabPanels,
  Button,
  SelectItem,
} from '@carbon/react';

import {Select as SelectCarbon} from '@carbon/react'; 
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';



class App extends Component {
  constructor(props) {
    super(props)
    let min_cols = props.min_cols != null ? props.min_cols : 2
    let max_cols = props.max_cols != null ? props.max_cols : 4
    this.state = {
      'title_index': 0,
      'added_file': null,
      'loaded': false,
      'fields': props.fields,
      'titles': props.titles,
      'min_cols': min_cols,
      'max_cols': max_cols,
      'curr_num_of_cols': this.random_between_two_nums(min_cols, max_cols),
      'selectedIndex': 0
    }
  }
  componentDidMount() {

  }
  get_random_item(list) {
    let index = Math.floor(Math.random() * list.length)
    return [list[index], index]
  }
  componentWillReceiveProps(props) {
    // if (props.fields != null || props.titles!=null ) {
      // let fields_temp = props.fields;
      // fields_temp = this.shuffle_list(fields_temp);
      // for (let field of fields_temp) {
      //   let labels = [field['name']].concat(field['alt'])
      //   let rand_new = Math.floor(Math.random() * labels.length)
      //   field.selected_alt = rand_new;

      //   if (this.props.use_placeholder) {
      //     let new_is_placeholder = this.random_between_two_nums(0, 1)
      //     field.is_placeholder = new_is_placeholder == 1 ? true : false

      //   }
      // }
      // this.setState({
      //   title_index: null,
      //   fields: fields_temp
      // })
      // this.setState({'fields': props.fields , 'titles': props.titles})
      // this.randomize_fields(false)
    // }


  }
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  onChangeMaterial = (e)=>{
    console.log("selected value",e.target.value);
    let val = e.target.value
    let current_fields = this.state.fields;
    let filteredBySelect = current_fields.filter(o=>  o['type']=='select')
    if (filteredBySelect.length == 0){
      return
    }
    let reason_field = filteredBySelect[0]
    reason_field['value'] = val

    // for(let opt of reason_field['options']){
    //   if(val.includes( opt.label)){
    //     reason_field['value'] = opt.label
    //     break;

    //   }
    // }
    console.log("updated value with",current_fields)
    this.setState({fields: current_fields})
  }
  generate_line(fields, submit_button, line_index) {
    let line_fields = []
    for (let field of fields) {
      let labels = [field['name']].concat(field['alt'])
      let unique_key = this.props.unique_key + "_" + field['name'];
      if (field['type'] == 'select' && field['framework']== 0) {
        console.log("field", field);
        line_fields.push(
        <FormControl key={`${unique_key}_formcontrol_select`} style={{"width": "8rem", "marginTop": "10px"}} fullWidth>
          <InputLabel>{field['name']}</InputLabel>
          <Select
                 key={`${unique_key}_select_item`}
          onChange={this.onChangeMaterial}
          value={field['value']}
          >
            {
              field['options'].map((o)=> <MenuItem     key={`${unique_key}_${o.value}`} value={o.value}>{o.label}</MenuItem>)
            }
          </Select>
        </FormControl>
        )
        continue;
      }
      if (field['type'] == 'select' && field['framework']== 1) {
        console.log("field", field);
        line_fields.push(
          <SelectCarbon
          key={`${unique_key}select`}
          // id="select-1"
          onChange={this.onChangeMaterial}
          defaultValue="placeholder-item"
          value={field['value']}
          labelText={field['name']}
          >
         <SelectItem
          
          value="placeholder-item"
          text="Choose an option"
        />
            {
              field['options'].map((o)=> <SelectItem key={`${unique_key}_${o.value}`} text={o.label} value={o.value}/>)
            }

        
        </SelectCarbon>
        )
        continue;
      }

      if (this.props.use_placeholder && field['is_placeholder']) {
        line_fields.push(<FormGroup key={`${unique_key}_formgroup`} >
          <FormLabel style={{ visibility: 'hidden' }} key={`${unique_key}_label_fake`} >.</FormLabel>
          <TextInput placeholder={labels[field.selected_alt]} key={`${unique_key}_input`} value={this.state.fields.find(o => o["name"] == field["name"]).value} onChange={(e) => {
            let state_fields = this.state.fields
            state_fields.find(o => o['name'] == field['name'])['value'] = e.target.value
            this.setState({ "fields": state_fields })
          }} />
        </FormGroup>)

      } else if (this.props.use_label_position && field['label_position'] == 'down') {

        line_fields.push(

          <FormGroup key={`${unique_key}_formgroup`} >
            <FormLabel style={{ visibility: 'hidden' }} key={`${unique_key}_label_down`} >.</FormLabel>
            <TextInput key={`${unique_key}_input`} value={this.state.fields.find(o => o["name"] == field["name"]).value} onChange={(e) => {
              let state_fields = this.state.fields
              state_fields.find(o => o['name'] == field['name'])['value'] = e.target.value
              this.setState({ "fields": state_fields })
            }} />
            <FormLabel key={`${unique_key}_label`} >{labels[field.selected_alt]}</FormLabel>


          </FormGroup>)
      }
      else {
        line_fields.push(<FormGroup key={`${unique_key}_formgroup`} >
          <FormLabel key={`${unique_key}_label`} >{labels[field.selected_alt]}</FormLabel>
          <TextInput key={`${unique_key}_input`} value={this.state.fields.find(o => o["name"] == field["name"]).value} onChange={(e) => {
            let state_fields = this.state.fields
            state_fields.find(o => o['name'] == field['name'])['value'] = e.target.value
            this.setState({ "fields": state_fields })
          }} />

        </FormGroup>)
      }
     

    }
    if (submit_button != null) {
      line_fields.push(
        <FormGroup key={`${this.props.unique_key + "_"}_submit`}>
          <FormLabel key={`${this.props.unique_key + "_"}_dummy_label`} style={{ 'visibility': 'hidden' }}>.</FormLabel>
          <div>    {submit_button}
          </div>

        </FormGroup>
      )
    }
    return [
      <Stack key={`${this.props.unique_key + "_"}_stack_${line_index}`} gap={4} orientation="horizontal">
        {line_fields}
      </Stack>,
      <br />,
      <br />]
  }
  generateWithDividing(submit_button) {
    let fields = this.state.fields
    let curr_list = []
    let result = []
    let line_index = 0
    for (let i = 0; i < fields.length; i++) {
      curr_list.push(fields[i])
      if ((i + 1) % this.state.curr_num_of_cols == 0) {
        result.push(this.generate_line(curr_list, submit_button, line_index))
        line_index++;
        curr_list = []
      }
    }
    if (curr_list.length > 0) {
      result.push(this.generate_line(curr_list, submit_button, line_index))
      line_index++;
    }
    return result
  }
  random_between_two_nums(min, max) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand
  }
  shuffle_list(fields) {
    return fields.sort(() => Math.random() - 0.5)
  }
  generateTitle(titles) {
    // if (this.state.title_index == null) {
    //   let res = this.get_random_item(titles)
    //   let val = res[0]
    //   let index = res[1]
    //   this.setState({ 'title_index': index })
    //   return <div ><h3>{val}</h3></div>
    // } else {
      return <div ><h3>{titles[this.state.title_index]}</h3></div>
    // }


  }
  randomize_fields = (reset_values) => {
    let curr_fields = this.state.fields
    curr_fields = this.shuffle_list(curr_fields)
    for (let field of curr_fields) {
      let labels = [field['name']].concat(field['alt'])
      let rand_new = Math.floor(Math.random() * labels.length)
      field.selected_alt = rand_new;
      if (this.props.use_placeholder) {
        let new_is_placeholder = this.random_between_two_nums(0, 1)
        field.is_placeholder = new_is_placeholder == 1 ? true : false
      }
      if (this.props.use_label_position) {
        let label_index = this.random_between_two_nums(0, 1)
        field.label_position = label_index == 1 ? 'up' : 'down'
      }
      if(field['type']=='select'){
        for(let val of field['options']){
          val['value'] = val['label'] + "_"+ this.makeid(5)
        }
        field['framework'] = this.random_between_two_nums(0, 1)
        field['options'] = this.shuffle_list(field['options'])
      }
      if(field && reset_values==true)
        field.value = ""
    }
    let title_index = 0
    if(this.state.titles != null){
          let res = this.get_random_item(this.state.titles)
          let val = res[0]
          title_index = res[1]
    }


    this.setState({
      curr_num_of_cols: this.random_between_two_nums(this.state.min_cols, this.state.max_cols), fields: curr_fields,
      title_index: title_index,
    })
  }
  render() {
    let submit_button = <Button kind="tertiary" size="md" type="submit" className="some-class" onClick={(e) => {
      e.preventDefault();

      let values = JSON.parse(JSON.stringify(this.state.fields))
      console.log('values are', values);
      this.randomize_fields(true && !this.props.no_reset)
      if (this.props.on_submit != null) {
        this.props.on_submit(values)
      }
    }} >
      {this.props.submit_label ? this.props.submit_label : "Submit"}
    </Button>

    return (
      <div className={this.props.centered_form ? 'centeredForm' : ''}>
        {
          this.state.titles != null && this.generateTitle(this.state.titles)
        }
        <Form key={`${this.props.unique_key}_form`}>
          {/* {this.generateWithDividing()} */}
          {!this.props.submit_h ? [this.generateWithDividing(null), <br />, <br />, submit_button] :
            [this.generateWithDividing(submit_button)]
          }

        </Form>
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
