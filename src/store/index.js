import { configureStore } from '@reduxjs/toolkit'
import mqttReducer from './mqtt'
import { combineReducers } from 'redux'
const reducer = combineReducers({
    mqttReducer,
  })

const  store = configureStore({
reducer,
})
export default store;
