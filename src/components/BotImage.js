import { bindActionCreators } from 'redux'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Tile,
    Button,
} from '@carbon/react';
import eva from './Eva.svg'
import evaTalking from './Eva talking.svg'
import evaListening from './Eva listening.svg'

class CanSay extends Component {
    constructor(props) {
        super(props)
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
    generateImage = ()=>{
        switch(this.props.data){
            case null:
                return  <img src={eva}></img>
            case 'listening':
                return  <img src={evaListening}></img>
            case 'speaking':
                return  <img src={evaTalking}></img>
        }
    }
    render() {
        return (
            <div className='specialBotImage'>
                {this.generateImage()}
            
            </div>
            
        //     <Tile className='specialTile'>
        //     <h5>What can you say/do now:</h5>
        //     <br />
        //     <br />
        //    {this.generateButtons()}
        //    </Tile>

        );
    }
}

const mapStateToProps = (state) => {
    console.log("state: ", state)
    let new_data = state.mqttReducer.eva_state
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
