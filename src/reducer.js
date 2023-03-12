import {
    mqttConnectionState
} from './actions'



let initialState = {
    client: null,
    err: null
}

const createClient = () => {
    const client = mqtt.connect(options);

    client.on('connect', function () {
        mqttConnectionState('MQTT_CONNECTED')

        client.subscribe(['btemp', 'otemp'], (err, granted) => {
            if (err) alert(err)
            console.log(`Subscribed to: otemp & btemp topics`)
        });
    });

    return client;
}

function app(state = initialState, action) {
    switch (action.type) {
        case 'INIT_CONNECTION':
            return {
                ...state,
                client: createClient()
            }
        case 'MQTT_CONNECTED':
            return {
                ...state,
                err: action.payload
            }
        default:
            return state
    }
}