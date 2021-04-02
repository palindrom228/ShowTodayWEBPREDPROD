import { combineReducers } from "redux";
import { addGameReducer } from "./addGameReducer";
import {authReducer} from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { navigationReducer } from "./navigationReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    navigation: navigationReducer,
    calendar: calendarReducer,
    addGame: addGameReducer
})