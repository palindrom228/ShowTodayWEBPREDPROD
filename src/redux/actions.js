import {ADD_GAME_SET_STATE,  ADD_GAME_CLOSE, ADD_GAME_OPEN, LOGIN, LOGOUT, NAVIGATION_TOGGLE, NEXT_MONTH, PREV_MONTH, SELECT_DAY, THIS_DAY, ADD_GAME_RESET_STATE, LOAD_GAMES } from "./types"
import moment from 'moment';

export const login = (data) => {
    localStorage.setItem('token', data.token)
    return{
        type: LOGIN,
        payload: data
    }
}
export const logout = (data) => {
    localStorage.removeItem('token')
    return{
        type: LOGOUT,
    }
}
export const toggleNav = () => {
    return{
        type: NAVIGATION_TOGGLE
    }
}
export const nextMonth = (date) => {
    const oldMonth = moment(date).format('M/Y')
    const newMonth = moment(oldMonth,'M/Y').add(1,'M')
    return{
        type: NEXT_MONTH,
        payload: moment(newMonth).valueOf()
    }
}
export const prevMonth = (date) => {
    const oldMonth = moment(date).format('M/Y')
    const newMonth = moment(oldMonth,'M/Y').subtract(1,'M')
    return{
        type: PREV_MONTH,
        payload: moment(newMonth).valueOf()
    }
}
export const currentDay = () => {
    return{
        type: THIS_DAY
    }
}
export const selectDay = (e) => {
    const prevDay = [...document.getElementsByClassName('selectedDay')]
    if(prevDay.length > 0){
        for(let key in prevDay){
            prevDay[key].classList.remove('selectedDay')
        }
    }
    e.currentTarget.classList.add('selectedDay')
    return{
        type: SELECT_DAY,
        payload: Number(e.currentTarget.getAttribute('data'))
    }
}
export const openAddGame = () => {
    return {
        type: ADD_GAME_OPEN
    }
}
export const closeAddGame = () => {
    return {
        type: ADD_GAME_CLOSE
    }
}
export const setDataAddGame = (data) => {
    return {
        type: ADD_GAME_SET_STATE,
        payload: data
    }
}
export const resetAddGame = () => {
    return {
        type: ADD_GAME_RESET_STATE
    }
}
export const loadGame = (data) => {
    return{
        type: LOAD_GAMES,
        payload: data
    }
}