import { bindActionCreators } from 'redux'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Tile,
    Button,
} from '@carbon/react';

class JustSaid extends Component {
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

    generateButtons = () => {
        let data = this.props.data;
        if(data!=null && data!='')
            return <Button kind='tertiary' className='specialButton' size='sm' key={'just-said' + this.makeid(5) }>{data}</Button>
    }
    render() {
        return (
            <Tile className='specialTile'>
                <h5>What I understand now:</h5>
                <br />
                <br />
                {this.generateButtons()}
            </Tile>

        );
    }
}

const mapStateToProps = (state) => {
    console.log("state: ", state)
    return {
        ...state,
        data: state.mqttReducer.interpretation_of_last_action
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({}, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JustSaid)
