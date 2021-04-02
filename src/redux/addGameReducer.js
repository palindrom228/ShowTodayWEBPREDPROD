import moment from 'moment'
import { ADD_GAME_CLOSE, ADD_GAME_OPEN, ADD_GAME_RESET_STATE, ADD_GAME_SET_STATE } from './types';

const initialState = {
    data: {
        date: moment().valueOf(),
        duration: '1',
        client: '',
        summ: 0,
        prepay: 0,
        col: 6,
        type: false,
        address: '',
        evening: 0,
        child: false
    },
    open: false
}
export const addGameReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_GAME_OPEN:
            return {...state, open: true}
        case ADD_GAME_CLOSE:
            return {...state, open: false}
        case ADD_GAME_RESET_STATE:
            return {...initialState, open: true}
        case ADD_GAME_SET_STATE:
            return {...state, data: {...state.data, [action.payload.name]: action.payload.value} }
        default:
            return state;
    }
}