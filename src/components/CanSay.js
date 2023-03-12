import { bindActionCreators } from 'redux'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Tile,
    Button,
} from '@carbon/react';
// import recordingIcon from './recording--filled--alt.svg'
class CanSay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recording_satus: "Start Recording"
        }
    }
    componentDidMount() {

    }
    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    generateButtons = () =>{
        let data = this.props.data;
        if(data !=null){
            return data.map((val,index) => <Button kind='tertiary' className='specialButton' size='sm' key={'can-say-'+this.makeid(5)}>{val.text}</Button>)
        }
    }

    render() {
        return (

            <Tile className='specialTile'>
                            <Button  kind={this.state.recording_satus == "Start Recording" ? 'tertiary' : "danger--tertiary"} onClick={()=>{
                                this.setState({"recording_satus": this.state.recording_satus == "Start Recording" ? "Stop Recording" : "Start Recording"})
                            }} size='sm' style={{position: 'absolute',marginRight: '5px',marginTop: '5px', top: 0, right: 0, textAlign:'center'}}>{this.state.recording_satus}</Button>

            <h5>What can you say/do now:</h5>
            <br />
            <br />
           {this.generateButtons()}
           </Tile>

        );
    }
}

const mapStateToProps = (state) => {
    console.log("state: ", state)
    let new_data = state.mqttReducer.suggested_nl_actions !=null && state.mqttReducer.suggested_nl_actions.length > 0 ?  state.mqttReducer.suggested_nl_actions[0].suggestions : []
    return {
        ...state,
        data: new_data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({  }, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CanSay)
