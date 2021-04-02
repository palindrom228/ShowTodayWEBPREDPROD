import { LOGIN, LOGOUT } from "./types";

const initialState = {
    isAuthenticated: false,
    token: '',
    name: '',
    type: '',
    city: ''
}
export const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case LOGIN:
            return state = {
                isAuthenticated: true,
                token: action.payload.token,
                name: action.payload.name,
                type: action.payload.type,
                city: action.payload.city
            }
        case LOGOUT: 
            return state = initialState
        default:
            return state

    }
}
