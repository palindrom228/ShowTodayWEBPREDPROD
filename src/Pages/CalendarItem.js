import { connect, useDispatch } from "react-redux"
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import 'moment/locale/ru'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { nextMonth, prevMonth, currentDay, selectDay, loadGame } from "../redux/actions";
import {useHttp} from '../hooks/http.hook'
const CalendarItem = ({thisDay,games, token}) => {
    const [calendar, setCalendar] = useState([

    ])
    const dispatch = useDispatch()
    const calendarInit = (thisDay) => {
        const firstDay = moment(moment(thisDay).format('M/Y'),'M/Y').valueOf()
        const firstDate = firstDay - ((moment(firstDay).isoWeekday() - 1) * 86400000 )
        const nextMonth = moment(moment(thisDay).format('M/Y'),'M/Y').add(1, 'M').valueOf()
        const lastDay = nextMonth + (( 7 - moment(nextMonth).isoWeekday() + 1) * 86400000)
        const newCalendar = []
        for(let i = Number(firstDate); i < Number(lastDay); i = i + 86400000){
            newCalendar.push(moment(i).format('D/M/Y'))
        }
        setCalendar(newCalendar)
    }
    useEffect(()=>{
        moment.locale('ru')
        calendarInit(thisDay)
    },[thisDay])
    const {request, loading} = useHttp()
    const loadData = async() => {
        try {
            const res = await request('api/games/loadgames', 'POST', {month: moment(moment(thisDay).format('M/Y'),'M/Y').valueOf()}, {
                Authorization: `Bearer ${token}`
            })
            dispatch(loadGame(res))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        loadData()
    },[thisDay])
    if(loading === true){
        return <div>...Loading</div>
    }
    var weekHub = []
    return(
        <React.Fragment>
            <div className='box'>
                <div className='calendarNavigation'>
                    <p className='buttonToThisDay' onClick={()=>dispatch(currentDay())}>СЕГОДНЯ</p>
                    <div className='dateAndNavi'>
                        <div className='calendarIcon' onClick={()=>dispatch(prevMonth(thisDay))}>
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                        </div>    
                            <p className='monthNav'>{moment(thisDay).format('MMMM Y')}</p>
                        <div className="calendarIcon" onClick={()=>dispatch(nextMonth(thisDay))}>
                            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            {calendar.map((day,i) => {
                const date = day
                weekHub.push(date)

                if (((i + 1) % 7) === 0) {
                    const render = weekHub
                    const week = moment(day, 'D/M/Y').format('W')
                    weekHub = []
                    return <div key={week} className={(calendar.length / 7) === 4?'week week4':(calendar.length / 7) === 5 ? 'week week5':(calendar.length / 7) === 6?'week week6':''} >
                        <div className='weekNumber'>{week}</div>
                        {render.map((day) => {
                            return (
                                <div className={day===moment().format('D/M/Y')? 'currentDay day': 'day'} onClick={(e)=>dispatch(selectDay(e))}data={moment(day,'D/M/Y').valueOf()} key={moment(day,'D/M/Y').valueOf()}>
                                    <div className='dayHead'>{moment(day,'D/M/Y').format('D')}</div>
                                    <div className='dayBody'>
                                    {games.map((game)=>{
                                        if(moment(game.date).format('D/M/Y') === day){
                                            return(
                                                <div className={game.type === 0? 'game': game.type === 1? 'game outSide': game.type === 2? 'game kids': ''} key={game._id}>
                                                    {moment(game.date).format('HH:mm')}
                                                </div>
                                            )
                                        }
                                    })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                
            })}
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
   return{
        thisDay: state.calendar.thisDay,
        games: state.calendar.games,
        selectedMonth: state.calendar.selectedMonth,
        token: state.auth.token
   } 
}
export default connect(mapStateToProps,null)(CalendarItem)