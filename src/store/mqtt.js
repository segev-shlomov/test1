import { createSlice } from '@reduxjs/toolkit'
import mqtt from 'mqtt/dist/mqtt'

const slice = createSlice({
  name: 'mqtt',
  initialState: {
    mqttConnected: false,
    mqttSubscribed: true,
    interpretation_of_last_action: null,
    eva_state: null,
    played_data: null,
    program_representation: null,
    suggested_nl_actions: null
  },
  reducers: {
    connectSuccess: (state, action) => {
        state.mqttConnected = true
        console.log("Reducer: connect success")

    },
    subscribeSuccess: (state, action) =>  {
        state.mqttSubscribed = true
        console.log("Reducer: subsribe success", action.payload.channel)
    },
    recievedData: (state, action) =>  {
        console.log(action.payload)
        let data = JSON.parse(action.payload.payload)
        state.suggested_nl_actions = data.suggested_nl_actions
        state.interpretation_of_last_action = data.interpretation_of_last_action
        state.program_representation = data.program_representation
        state.decision_values = data.decision_values
        state.played_data = data.played_data
        state.eva_state = data.eva_state
        console.log("Reducer: recieved data", data)

    },
  },
});

export default slice.reducer

// Actions

const { connectSuccess, subscribeSuccess, recievedData } = slice.actions

export const connectMQTT = () => async dispatch => {
  try {
    // await api.post('/api/auth/login/', { username, password })
    const client = mqtt.connect('mqtt://localhost:1883' );
        
        client.on('connect', function () {
            dispatch(connectSuccess());
            client.subscribe(['default-automation/advisor'], (err, granted) => {
                if (err) alert(err)
                dispatch(subscribeSuccess({channel: 'default-automation/advisor'}));
            });

        });

        client.on('message', function (topic,payload,packet) {
            dispatch(recievedData({topic, payload: payload.toString()}));
  

        });


        
  } catch (e) {
    return console.error(e.message);
  }
}