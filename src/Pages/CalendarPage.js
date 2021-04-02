import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { useState } from 'react'
import '../assets/calendar.css'
import CalendarItem from './CalendarItem'
import SelectedDay from './SelectedDay'

const CalendarPage = () => {
    return(
        <div className="calendarPage">
            <div className="calendarBox">
                <CalendarItem></CalendarItem>
            </div>
            
            <div className="dayBox">
                <SelectedDay></SelectedDay>
            </div>
            
        </div>         
    )
}
export default CalendarPage