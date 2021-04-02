import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import '../assets/DatePicker.css'
const DatePicker = ({ initValue = moment().valueOf(),onChange }) => {
    const [selectedDate, setSelectedDate] = useState(moment(moment(initValue).format('D/M/Y'),'D/M/Y').valueOf())
    const [month, setMonth] = useState(moment(moment(initValue).format('M/Y'), 'M/Y').valueOf())
    const [calendar, setCalendar] = useState([])
    const filMonth = () => {
        const firstDate = month - ((moment(month).isoWeekday() - 1) * 86400000)
        const nextMonth = moment(moment(month).format('M/Y'), 'M/Y').add(1, 'M').valueOf()
        const lastDay = nextMonth + ((7 - moment(nextMonth).isoWeekday() + 1) * 86400000)
        const newCalendar = []
        for (let i = Number(firstDate); i < Number(lastDay); i = i + 86400000) {
            newCalendar.push(moment(i).format('D/M/Y'))
        }
        setCalendar(newCalendar)
    }
    const [time, setTime] = useState(36000000)
    useEffect(()=>{
        filMonth()
    },[month])
    const hourArr = () =>{
        let arr = []
        let hour = 36000000
        let  pot = 86400000
        for(let i = 0; i < 17; i++){
            arr[i] = hour
            hour = hour + 3600000
            if(hour === pot) hour = 0
        }
        return arr
    }
    const minuteArr = () => {
        let arr = []
        let minute = 0
        for(let i = 0; i < 6; i++){
            arr[i] = minute
            minute = minute + 600000
        }
        return arr
    }
    const arrh = hourArr()
    const arrm = minuteArr()
    const selectH = (e) => {
        let newState = (time % 3600000) + Number(e.currentTarget.getAttribute('data'))
        setTime(newState)
    }
    const selectM = (e) => {
        let newState = time - (time % 3600000) + Number(e.currentTarget.getAttribute('data'))
        setTime(newState)
        setInSelecting(!inSelecting)
    }
    const nextMonth = () => {
        let newState = moment(month).add(1,'M').valueOf()
        setMonth(newState)
    }
    const prevMonth = () => {
        let newState = moment(month).subtract(1,'M').valueOf()
        setMonth(newState)
    }
    useEffect(()=>{
        let e = {
                name: 'date',
                value: selectedDate + time
        }
        
        onChange(e)
    },[time,selectedDate])
    const [inSelecting,setInSelecting] = useState(false)
    var weekHub = []
    return (
        <React.Fragment>
            <div className="datePickerBox">
                <div className="datePickerNavi">
                    <div className='iconBoxNaviDatePicker' onClick={prevMonth}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></div>
                    <div className="datePickerMonth">{moment(month).format('MMMM')}</div>
                    <div className='iconBoxNaviDatePicker' onClick={nextMonth}><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></div>
                </div>
                <div className='timePicker'>
                    <p className='hours'>{Math.floor(time / 3600000)} : {(time % 3600000)!==0?((time % 3600000) / 60000):'00'}</p>
                    <FontAwesomeIcon className='arrow' icon={faSortDown} onClick={()=>{setInSelecting(!inSelecting)}}></FontAwesomeIcon>
                    <div className={inSelecting?'dropTime dropTimeOn':'dropTime'}>
                        <div className='dropDownHours'>
                            <div className='sortUpDropDown'><FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon></div>
                            <div className='sortDownDropDown'><FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon></div>
                            <div className='dropItems'>
                                {
                                    arrh.map((h) => {
                                        if (h === 0) return <p key={h} data={h} onClick={selectH} >00</p>
                                        return <p data={h} key={h} onClick={selectH}>{Math.floor(h / 3600000)}</p>
                                    })
                                }
                            </div>
                        </div>
                        <div className='dropDownMinute'>
                            <div className='sortUpDropDown'><FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon></div>
                            <div className='sortDownDropDown'><FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon></div>
                            <div className='dropItems'>
                                {
                                    arrm.map((m) => {
                                        if (m === 0) return <p data={m} key={m} onClick={selectM}>00</p>
                                        return <p data={m} key={m} onClick={selectM}>{(m % 3600000) / 60000}</p>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='datePickerCalendar'>
                    <div className='daysOfWeek'>
                        <div>пн</div>
                        <div>вт</div>
                        <div>ср</div>
                        <div>чт</div>
                        <div>пт</div>
                        <div>сб</div>
                        <div>вс</div>
                    </div>
                    <div className='DatePickerItemsBox'>
                {calendar.map((day,i) => {
                const date = day
                weekHub.push(date)

                if (((i + 1) % 7) === 0) {
                    const render = weekHub
                    weekHub = []
                    return <div key={moment(day,'D/M/Y').format('W') + '%'} className={(calendar.length / 7) === 4?'datePickerWeek week4':(calendar.length / 7) === 5 ? 'datePickerWeek week5':(calendar.length / 7) === 6?'datePickerWeek week6':''}>
                        {render.map((day) => {
                            return (
                                    <div className={moment(selectedDate).format('D/M/Y')==day?'datePickerDay selectedDayPickerDay':'datePickerDay'} key={moment(day,'D/M/Y').valueOf() + 2} data={moment(day,'D/M/Y').valueOf()} onClick={(e)=>setSelectedDate(Number(e.currentTarget.getAttribute('data')))}>{moment(day,'D/M/Y').format('D')}</div>
                            )
                        })}
                    </div>
                }
                
            })}
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default DatePicker