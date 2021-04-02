import moment from "moment";
import { LOAD_GAMES, NEXT_MONTH, PREV_MONTH, SELECT_DAY, THIS_DAY } from "./types";

const initialState = {
    thisDay: moment().valueOf(),
    games: [
        {
            _id: 465465,
            date: 1612725330131,
            type: 1
        },
        {
            _id: 465425,
            date: 1612725330131,
            type: 2
        },
        {
            _id: 4654652,
            date: 1612725330131,
            type: 3
        },
        {
            _id: 4615465,
            date: 1612725330131,
            type: 3
        },
        {
            _id: 46514265,
            date: 1612725330131,
            type: 3
        },
        {
            _id: 465465231,
            date: 1612725330131,
            type: 3
        },
        {
            _id: 465465111,
            date: 1612725330131,
            type: 3
        },
        {
            _id: 465465222,
            date: 1612725330131,
            type: 3
        },
        {
            _id: 465465123214,
            date: 1612725330131,
            type: 3
        },
    ],
    selectedDay: moment((moment().format('D/M/Y')),'D/M/Y').valueOf()
    
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case PREV_MONTH:
            return {...state, thisDay: action.payload}
        case NEXT_MONTH: 
        return {...state, thisDay: action.payload}    
        case THIS_DAY:
            return{...state, thisDay: moment().valueOf()}
        case SELECT_DAY:
            return{...state, selectedDay: action.payload}
        case LOAD_GAMES:
            return{...state, games: action.payload}
        default:
            return state;
    }
}