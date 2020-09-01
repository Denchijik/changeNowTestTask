
import { combineReducers } from 'redux';
import { appReducer as app } from '../components/App/duck'

const allReducers = {
    app,
}

export default combineReducers(allReducers);