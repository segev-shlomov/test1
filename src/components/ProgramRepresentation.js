import { bindActionCreators } from 'redux'
import React, { Component } from 'react';
import { connect } from 'react-redux'
// import './ProgramRepresentation.scss';
import {
    Tile,
    Button,
    Tag,
} from '@carbon/react';

class ProgramRepresentation extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {


    }
    generateButtons = () => {
        let data = this.props.data;
        if (data != null) {
            return data.map((val, index) => {
                let indentClass = val["indent"] == 1 ? " indentButton" : ""
                let running_step = val["running"]

                indentClass = val["indent"] == 2 ? " indentButtonTwice" : indentClass
                let classNameVal = "specialButton blackButton " +(indentClass)
                console.log("Classname is ", classNameVal)
                let role = null
                if (val.role != null) {

                    role = <Tag
                        className="tag-class"
                        type="blue"
                        size="sm"
                        title="Clear Filter"
                    >
                        {val.role}
                    </Tag>
                }
                let screenshot = null
                if(val.screenshot !=null){
                    console.log("screenshot string is", val.screenshot);
                    screenshot = <img src={`data:image/png;base64, ${val.screenshot}`}></img>
                }
                return <div><Button kind='tertiary' style={{backgroundColor: running_step ? 'aquamarine' : ''}} disabled className={classNameVal} size='sm' key={'prog-represenation-' + index}>{val.text}</Button>
                        {role!=null && role}
                        {screenshot!=null && screenshot}

                    </div>
            })
        }
    }
    generateDecisions = () =>{
        let data = this.props.decisions;
        if (data != null) {
            return data.map((val, index) => {
               return<Tag
                        type={val["covered"] ? "green" : "outline"}
                        size="sm"
                        title="Clear Filter"
                    >
                        {val.name}
                    </Tag>
                })
             
            }
        }
    generateScenes(){
        return ([ "Scenarios/Decisions:", <br/>
        ,this.generateDecisions()]
        
        )
    }
    render() {
        return (
            <Tile className='specialTile'>
                <h5>Program representation:</h5>
                <br />
                {!this.props.hideDecisions && this.generateScenes()}
                {!this.props.hideDecisions && [<br/>,<br/>] }
     
                {this.generateButtons()}
            </Tile>

        );
    }
}

const mapStateToProps = (state) => {
    console.log("state: ", state)
    return {
        ...state,
        data: state.mqttReducer.program_representation,
        decisions: state.mqttReducer.decision_values,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({}, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProgramRepresentation)
