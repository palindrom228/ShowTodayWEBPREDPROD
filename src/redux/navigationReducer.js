import { NAVIGATION_TOGGLE } from "./types";

const initialState = {
    isClosed: false
}
export const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATION_TOGGLE:
            return state = {
                isClosed: !state.isClosed
            }
        default:
            return state;
    }

}