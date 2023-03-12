
const mqttConnectionInit = () => {
    return {
        type: 'INIT_CONNECTION'
    }
}

const mqttConnectionState = (err = null) => {
    return {
        type: 'MQTT_CONNECTED',
        payload: err
    }
}